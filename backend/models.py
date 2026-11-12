from datetime import datetime
from sqlalchemy import (Column, Integer, String, Date, Time, DateTime,
                        ForeignKey, Text, UniqueConstraint)
from sqlalchemy.orm import relationship
from database import Base


# ---------- Konum: İl -> İlçe -> Hastane ----------
class City(Base):
    __tablename__ = "cities"
    id = Column(Integer, primary_key=True)
    plate_code = Column(String(2), unique=True, nullable=False)  # 01 = Adana
    name = Column(String(50), unique=True, nullable=False)

    districts = relationship("District", back_populates="city")


class District(Base):
    __tablename__ = "districts"
    id = Column(Integer, primary_key=True)
    name = Column(String(50), nullable=False)
    city_id = Column(Integer, ForeignKey("cities.id"), nullable=False, index=True)

    city = relationship("City", back_populates="districts")
    hospitals = relationship("Hospital", back_populates="district")

    __table_args__ = (UniqueConstraint("city_id", "name", name="uq_city_district"),)


class Hospital(Base):
    __tablename__ = "hospitals"
    id = Column(Integer, primary_key=True)
    name = Column(String(150), nullable=False)
    hospital_type = Column(String(50), nullable=False)  # Devlet / Şehir / Eğitim ve Araştırma
    district_id = Column(Integer, ForeignKey("districts.id"), nullable=False, index=True)

    district = relationship("District", back_populates="hospitals")
    doctors = relationship("Doctor", back_populates="hospital")


# ---------- Klinik (branş) ve doktor ----------
class Branch(Base):
    __tablename__ = "branches"
    id = Column(Integer, primary_key=True)
    name = Column(String(100), unique=True, nullable=False)

    doctors = relationship("Doctor", back_populates="branch")


class Doctor(Base):
    __tablename__ = "doctors"
    id = Column(Integer, primary_key=True)
    title = Column(String(20), nullable=False)          # Uzm. Dr., Op. Dr., Doç. Dr., Prof. Dr.
    full_name = Column(String(100), nullable=False)
    branch_id = Column(Integer, ForeignKey("branches.id"), nullable=False, index=True)
    hospital_id = Column(Integer, ForeignKey("hospitals.id"), nullable=False, index=True)

    branch = relationship("Branch", back_populates="doctors")
    hospital = relationship("Hospital", back_populates="doctors")
    working_hours = relationship("WorkingHour", back_populates="doctor")
    appointments = relationship("Appointment", back_populates="doctor")

    @property
    def display_name(self):
        return f"{self.title} {self.full_name}"


class WorkingHour(Base):
    __tablename__ = "working_hours"
    id = Column(Integer, primary_key=True)
    doctor_id = Column(Integer, ForeignKey("doctors.id"), nullable=False, index=True)
    weekday = Column(Integer, nullable=False)      # 0=Pazartesi ... 6=Pazar
    start_time = Column(Time, nullable=False)
    end_time = Column(Time, nullable=False)

    doctor = relationship("Doctor", back_populates="working_hours")


# ---------- Hasta, randevu, muayene geçmişi ----------
class Patient(Base):
    __tablename__ = "patients"
    id = Column(Integer, primary_key=True)
    full_name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)

    appointments = relationship("Appointment", back_populates="patient")
    records = relationship("MedicalRecord", back_populates="patient")


class Appointment(Base):
    __tablename__ = "appointments"
    id = Column(Integer, primary_key=True)
    patient_id = Column(Integer, ForeignKey("patients.id"), nullable=False, index=True)
    doctor_id = Column(Integer, ForeignKey("doctors.id"), nullable=False, index=True)
    date = Column(Date, nullable=False)
    time = Column(Time, nullable=False)
    status = Column(String(20), default="active")   # active / cancelled
    created_at = Column(DateTime, default=datetime.now)

    patient = relationship("Patient", back_populates="appointments")
    doctor = relationship("Doctor", back_populates="appointments")

    # ÇAKIŞMA ENGELİ: aynı doktor + aynı gün + aynı saat sadece 1 kez olabilir
    __table_args__ = (
        UniqueConstraint("doctor_id", "date", "time", name="uq_doctor_slot"),
    )


class MedicalRecord(Base):
    __tablename__ = "medical_records"
    id = Column(Integer, primary_key=True)
    patient_id = Column(Integer, ForeignKey("patients.id"), nullable=False, index=True)
    doctor_id = Column(Integer, ForeignKey("doctors.id"), nullable=False)
    appointment_id = Column(Integer, ForeignKey("appointments.id"))
    diagnosis = Column(String(255))
    notes = Column(Text)
    created_at = Column(DateTime, default=datetime.now)

    patient = relationship("Patient", back_populates="records")