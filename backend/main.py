from datetime import date as date_type, time as time_type, datetime, timedelta
from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from database import engine, Base, get_db
import models

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Hospital Appointment System")

SLOT_MINUTES = 30  # her randevu 30 dakika


# ---------- İstek şemaları (frontend'den gelecek veri formatı) ----------
class AppointmentCreate(BaseModel):
    patient_id: int
    doctor_id: int
    date: date_type   # örn. "2026-11-16"
    time: time_type   # örn. "09:30"


# ---------- Yardımcı fonksiyonlar (randevu algoritması) ----------
def generate_slots(start: time_type, end: time_type):
    """Çalışma saatini 30 dakikalık dilimlere böler: 09:00, 09:30, ... 16:30"""
    slots = []
    current = datetime.combine(date_type.today(), start)
    end_dt = datetime.combine(date_type.today(), end)
    while current + timedelta(minutes=SLOT_MINUTES) <= end_dt:
        slots.append(current.time())
        current += timedelta(minutes=SLOT_MINUTES)
    return slots


def get_working_slots(db: Session, doctor_id: int, day: date_type):
    """Doktorun o gün çalıştığı tüm dilimler (dolu/boş fark etmeksizin)."""
    hours = db.query(models.WorkingHour).filter_by(
        doctor_id=doctor_id, weekday=day.weekday()).all()
    slots = []
    for wh in hours:
        slots += generate_slots(wh.start_time, wh.end_time)
    return slots


def get_booked_slots(db: Session, doctor_id: int, day: date_type):
    """O gün aktif randevusu olan (dolu) dilimler."""
    rows = db.query(models.Appointment).filter_by(
        doctor_id=doctor_id, date=day, status="active").all()
    return {a.time for a in rows}


# ---------- Endpoint'ler ----------
@app.get("/")
def home():
    return {"message": "Hospital Appointment System çalışıyor!"}


@app.get("/branches")
def list_branches(db: Session = Depends(get_db)):
    return [{"id": b.id, "name": b.name} for b in db.query(models.Branch).all()]


@app.get("/branches/{branch_id}/doctors")
def list_doctors(branch_id: int, db: Session = Depends(get_db)):
    doctors = db.query(models.Doctor).filter_by(branch_id=branch_id).all()
    return [{"id": d.id, "full_name": d.full_name} for d in doctors]


@app.get("/doctors/{doctor_id}/slots")
def available_slots(doctor_id: int, day: date_type, db: Session = Depends(get_db)):
    """Seçilen doktorun seçilen gündeki BOŞ saatleri."""
    if not db.get(models.Doctor, doctor_id):
        raise HTTPException(404, "Doktor bulunamadı")
    working = get_working_slots(db, doctor_id, day)
    booked = get_booked_slots(db, doctor_id, day)
    now = datetime.now()
    free = [s for s in working
            if s not in booked and datetime.combine(day, s) > now]
    return {"doctor_id": doctor_id, "date": day,
            "free_slots": [s.strftime("%H:%M") for s in free]}


@app.post("/appointments", status_code=201)
def create_appointment(data: AppointmentCreate, db: Session = Depends(get_db)):
    """Randevu oluşturur. ÇAKIŞMA KONTROLÜ burada yapılır."""
    # 1) Hasta ve doktor var mı?
    if not db.get(models.Patient, data.patient_id):
        raise HTTPException(404, "Hasta bulunamadı")
    if not db.get(models.Doctor, data.doctor_id):
        raise HTTPException(404, "Doktor bulunamadı")

    # 2) Geçmiş bir zaman mı?
    if datetime.combine(data.date, data.time) <= datetime.now():
        raise HTTPException(400, "Geçmiş bir tarihe randevu alınamaz")

    # 3) Doktorun çalışma saatleri içinde ve geçerli bir dilim mi?
    if data.time not in get_working_slots(db, data.doctor_id, data.date):
        raise HTTPException(400, "Seçilen saat doktorun çalışma saatleri dışında")

    # 4) Hastanın aynı saatte başka bir randevusu var mı?
    patient_busy = db.query(models.Appointment).filter_by(
        patient_id=data.patient_id, date=data.date,
        time=data.time, status="active").first()
    if patient_busy:
        raise HTTPException(409, "Bu saatte zaten başka bir randevunuz var")

    # 5) Doktorun bu dilimi dolu mu?
    existing = db.query(models.Appointment).filter_by(
        doctor_id=data.doctor_id, date=data.date, time=data.time).first()
    if existing and existing.status == "active":
        raise HTTPException(409, "Bu saat dolu, lütfen başka bir saat seçin")

    try:
        if existing:  # daha önce iptal edilmiş dilim -> yeniden kullan
            existing.patient_id = data.patient_id
            existing.status = "active"
            appointment = existing
        else:
            appointment = models.Appointment(
                patient_id=data.patient_id, doctor_id=data.doctor_id,
                date=data.date, time=data.time)
            db.add(appointment)
        db.commit()
    except IntegrityError:
        # Aynı anda iki kişi aynı slotu almaya çalışırsa veritabanı engeller
        db.rollback()
        raise HTTPException(409, "Bu saat az önce başka bir hasta tarafından alındı")

    db.refresh(appointment)
    return {"id": appointment.id, "doctor_id": appointment.doctor_id,
            "date": appointment.date, "time": appointment.time.strftime("%H:%M"),
            "status": appointment.status}


@app.get("/patients/{patient_id}/appointments")
def patient_appointments(patient_id: int, db: Session = Depends(get_db)):
    rows = db.query(models.Appointment).filter_by(patient_id=patient_id).order_by(
        models.Appointment.date, models.Appointment.time).all()
    return [{"id": a.id, "doctor": a.doctor.full_name,
             "branch": a.doctor.branch.name, "date": a.date,
             "time": a.time.strftime("%H:%M"), "status": a.status} for a in rows]


@app.patch("/appointments/{appointment_id}/cancel")
def cancel_appointment(appointment_id: int, db: Session = Depends(get_db)):
    appointment = db.get(models.Appointment, appointment_id)
    if not appointment:
        raise HTTPException(404, "Randevu bulunamadı")
    appointment.status = "cancelled"
    db.commit()
    return {"id": appointment.id, "status": appointment.status}