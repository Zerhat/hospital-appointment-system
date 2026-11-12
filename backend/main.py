import hashlib
import os
from datetime import date as date_type, time as time_type, datetime, timedelta
from typing import Optional

from fastapi import FastAPI, Depends, HTTPException
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from database import engine, Base, get_db
import models

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Hospital Appointment System")

SLOT_MINUTES = 30      # her randevu 30 dakika
BOOKING_WINDOW = 14    # MHRS gibi: en fazla 14 gün sonrasına randevu


# ---------- İstek şemaları ----------
class AppointmentCreate(BaseModel):
    patient_id: int
    doctor_id: int
    date: date_type   # örn. "2026-11-16"
    time: time_type   # örn. "09:30"


class LoginRequest(BaseModel):
    email: str
    password: str


class RegisterRequest(BaseModel):
    full_name: str
    email: str
    password: str


def hash_password(password: str) -> str:
    # Şimdilik SHA-256; finalde bcrypt'e geçilecek
    return hashlib.sha256(password.encode()).hexdigest()


# Türkçe alfabetik sıralama (veritabanı Ç, Ğ, İ, Ö, Ş, Ü harflerini sona atıyor)
TR_ALPHABET = "abcçdefgğhıijklmnoöprsştuüvyz"
TR_ORDER = {ch: i for i, ch in enumerate(TR_ALPHABET)}


def tr_key(text: str):
    lowered = text.replace("I", "ı").replace("İ", "i").lower()
    return [TR_ORDER.get(ch, 100 + ord(ch)) for ch in lowered]


# ---------- Randevu algoritması: yardımcı fonksiyonlar ----------
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


def get_free_slots(db: Session, doctor_id: int, day: date_type):
    """Boş dilimler = çalışma dilimleri - dolu dilimler - geçmiş saatler"""
    working = get_working_slots(db, doctor_id, day)
    booked = get_booked_slots(db, doctor_id, day)
    now = datetime.now()
    return [s for s in working if s not in booked and datetime.combine(day, s) > now]


def doctor_query(db: Session, city_id=None, district_id=None,
                 hospital_id=None, branch_id=None):
    """İl / ilçe / hastane / klinik filtrelerine göre doktor sorgusu."""
    q = (db.query(models.Doctor)
         .join(models.Hospital, models.Doctor.hospital_id == models.Hospital.id)
         .join(models.District, models.Hospital.district_id == models.District.id))
    if city_id:
        q = q.filter(models.District.city_id == city_id)
    if district_id:
        q = q.filter(models.Hospital.district_id == district_id)
    if hospital_id:
        q = q.filter(models.Doctor.hospital_id == hospital_id)
    if branch_id:
        q = q.filter(models.Doctor.branch_id == branch_id)
    return q


def doctor_json(d: models.Doctor):
    return {"id": d.id, "title": d.title, "full_name": d.full_name,
            "display_name": d.display_name,
            "branch": d.branch.name, "hospital_id": d.hospital_id,
            "hospital": d.hospital.name, "district": d.hospital.district.name,
            "city": d.hospital.district.city.name}


# ---------- Genel ----------
@app.get("/")
def home():
    return {"message": "Hospital Appointment System çalışıyor!"}


# ---------- Kimlik doğrulama ----------
@app.post("/register", status_code=201)
def register(data: RegisterRequest, db: Session = Depends(get_db)):
    if db.query(models.Patient).filter_by(email=data.email).first():
        raise HTTPException(409, "Bu e-posta ile kayıtlı bir hesap zaten var")
    patient = models.Patient(full_name=data.full_name, email=data.email,
                             password_hash=hash_password(data.password))
    db.add(patient)
    db.commit()
    db.refresh(patient)
    return {"id": patient.id, "full_name": patient.full_name}


@app.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):
    patient = db.query(models.Patient).filter_by(email=data.email).first()
    if not patient or patient.password_hash != hash_password(data.password):
        raise HTTPException(401, "E-posta veya şifre hatalı")
    return {"id": patient.id, "full_name": patient.full_name}


# ---------- Konum: il / ilçe ----------
@app.get("/cities")
def list_cities(db: Session = Depends(get_db)):
    cities = sorted(db.query(models.City).all(), key=lambda c: tr_key(c.name))
    return [{"id": c.id, "plate_code": c.plate_code, "name": c.name} for c in cities]


@app.get("/cities/{city_id}/districts")
def list_districts(city_id: int, db: Session = Depends(get_db)):
    districts = sorted(db.query(models.District).filter_by(city_id=city_id).all(),
                       key=lambda d: tr_key(d.name))
    return [{"id": d.id, "name": d.name} for d in districts]


# ---------- Klinik / hastane / doktor ----------
@app.get("/branches")
def list_branches(city_id: Optional[int] = None, district_id: Optional[int] = None,
                  db: Session = Depends(get_db)):
    """Seçilen il/ilçede doktoru bulunan klinikler (filtre yoksa hepsi)."""
    if not city_id and not district_id:
        branches = db.query(models.Branch).all()
    else:
        ids = {d.branch_id for d in doctor_query(db, city_id, district_id).all()}
        branches = db.query(models.Branch).filter(models.Branch.id.in_(ids)).all()
    branches.sort(key=lambda b: tr_key(b.name))
    return [{"id": b.id, "name": b.name} for b in branches]


@app.get("/hospitals")
def list_hospitals(city_id: Optional[int] = None, district_id: Optional[int] = None,
                   branch_id: Optional[int] = None, db: Session = Depends(get_db)):
    """Seçilen il/ilçede, seçilen klinikte doktoru olan hastaneler."""
    hospital_ids = {d.hospital_id for d in doctor_query(db, city_id, district_id,
                                                         branch_id=branch_id).all()}
    hospitals = sorted(db.query(models.Hospital).filter(models.Hospital.id.in_(hospital_ids)).all(),
                       key=lambda h: tr_key(h.name))
    return [{"id": h.id, "name": h.name, "type": h.hospital_type,
             "district": h.district.name, "city": h.district.city.name} for h in hospitals]


@app.get("/doctors")
def list_doctors(city_id: Optional[int] = None, district_id: Optional[int] = None,
                 hospital_id: Optional[int] = None, branch_id: Optional[int] = None,
                 db: Session = Depends(get_db)):
    """Filtrelere uyan doktorlar + her birinin en yakın boş randevu günü."""
    if not (city_id or district_id or hospital_id):
        raise HTTPException(400, "En az il, ilçe veya hastane seçilmelidir")
    doctors = doctor_query(db, city_id, district_id, hospital_id, branch_id).limit(200).all()
    result = []
    for d in doctors:
        item = doctor_json(d)
        item["next_available"] = next_available_day(db, d.id)
        result.append(item)
    # En erken boş randevusu olan doktor en üstte
    result.sort(key=lambda x: (x["next_available"] is None, x["next_available"] or ""))
    return result


def next_available_day(db: Session, doctor_id: int):
    today = date_type.today()
    for i in range(BOOKING_WINDOW + 1):
        day = today + timedelta(days=i)
        if get_free_slots(db, doctor_id, day):
            return day.isoformat()
    return None


@app.get("/doctors/{doctor_id}/days")
def available_days(doctor_id: int, db: Session = Depends(get_db)):
    """Önümüzdeki 14 gün için her gündeki boş randevu sayısı (gün kartları için)."""
    if not db.get(models.Doctor, doctor_id):
        raise HTTPException(404, "Doktor bulunamadı")
    today = date_type.today()
    days = []
    for i in range(BOOKING_WINDOW + 1):
        day = today + timedelta(days=i)
        days.append({"date": day.isoformat(), "weekday": day.weekday(),
                     "free_count": len(get_free_slots(db, doctor_id, day))})
    return days


@app.get("/doctors/{doctor_id}/slots")
def available_slots(doctor_id: int, day: date_type, db: Session = Depends(get_db)):
    """Seçilen doktorun seçilen gündeki BOŞ saatleri."""
    doctor = db.get(models.Doctor, doctor_id)
    if not doctor:
        raise HTTPException(404, "Doktor bulunamadı")
    free = get_free_slots(db, doctor_id, day)
    return {"doctor": doctor_json(doctor), "date": day,
            "free_slots": [s.strftime("%H:%M") for s in free]}


# ---------- Randevu ----------
@app.post("/appointments", status_code=201)
def create_appointment(data: AppointmentCreate, db: Session = Depends(get_db)):
    """Randevu oluşturur. ÇAKIŞMA KONTROLÜ burada yapılır."""
    # 1) Hasta ve doktor var mı?
    if not db.get(models.Patient, data.patient_id):
        raise HTTPException(404, "Hasta bulunamadı")
    doctor = db.get(models.Doctor, data.doctor_id)
    if not doctor:
        raise HTTPException(404, "Doktor bulunamadı")

    # 2) Geçmiş bir zaman mı / 14 günden ileri mi?
    if datetime.combine(data.date, data.time) <= datetime.now():
        raise HTTPException(400, "Geçmiş bir tarihe randevu alınamaz")
    if data.date > date_type.today() + timedelta(days=BOOKING_WINDOW):
        raise HTTPException(400, f"En fazla {BOOKING_WINDOW} gün sonrasına randevu alınabilir")

    # 3) Doktorun çalışma saatleri içinde ve geçerli bir dilim mi?
    if data.time not in get_working_slots(db, data.doctor_id, data.date):
        raise HTTPException(400, "Seçilen saat doktorun çalışma saatleri dışında")

    # 4) Hastanın aynı saatte başka bir randevusu var mı?
    patient_busy = db.query(models.Appointment).filter_by(
        patient_id=data.patient_id, date=data.date,
        time=data.time, status="active").first()
    if patient_busy:
        raise HTTPException(409, "Bu saatte zaten başka bir randevunuz var")

    # 5) Hastanın aynı klinikte aktif randevusu var mı? (MHRS kuralı)
    same_branch = (db.query(models.Appointment)
                   .join(models.Doctor, models.Appointment.doctor_id == models.Doctor.id)
                   .filter(models.Appointment.patient_id == data.patient_id,
                           models.Appointment.status == "active",
                           models.Appointment.date >= date_type.today(),
                           models.Doctor.branch_id == doctor.branch_id)
                   .first())
    if same_branch:
        raise HTTPException(409, "Bu klinikte zaten aktif bir randevunuz var")

    # 6) Doktorun bu dilimi dolu mu?
    existing = db.query(models.Appointment).filter_by(
        doctor_id=data.doctor_id, date=data.date, time=data.time).first()
    if existing and existing.status == "active":
        raise HTTPException(409, "Bu saat dolu, lütfen başka bir saat seçin")

    try:
        if existing:  # daha önce iptal edilmiş dilim -> yeniden kullan
            existing.patient_id = data.patient_id
            existing.status = "active"
            existing.created_at = datetime.now()
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
    return appointment_json(appointment)


def appointment_json(a: models.Appointment):
    h = a.doctor.hospital
    return {"id": a.id, "doctor": a.doctor.display_name, "branch": a.doctor.branch.name,
            "hospital": h.name, "district": h.district.name, "city": h.district.city.name,
            "date": a.date, "time": a.time.strftime("%H:%M"), "status": a.status}


@app.get("/patients/{patient_id}/appointments")
def patient_appointments(patient_id: int, db: Session = Depends(get_db)):
    rows = db.query(models.Appointment).filter_by(patient_id=patient_id).order_by(
        models.Appointment.date.desc(), models.Appointment.time.desc()).all()
    return [appointment_json(a) for a in rows]


@app.patch("/appointments/{appointment_id}/cancel")
def cancel_appointment(appointment_id: int, db: Session = Depends(get_db)):
    appointment = db.get(models.Appointment, appointment_id)
    if not appointment:
        raise HTTPException(404, "Randevu bulunamadı")
    appointment.status = "cancelled"
    db.commit()
    return {"id": appointment.id, "status": appointment.status}


# ---------- Frontend ----------
# frontend klasöründeki HTML/CSS/JS dosyaları http://127.0.0.1:8000/app adresinden sunulur
FRONTEND_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "frontend")
app.mount("/app", StaticFiles(directory=FRONTEND_DIR, html=True), name="frontend")