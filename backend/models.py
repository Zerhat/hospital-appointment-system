from datetime import datetime
from sqlalchemy import (Column, Integer, String, Date, Time, DateTime,
                        ForeignKey, Text, UniqueConstraint)
from sqlalchemy.orm import relationship
from database import Base


class Branch(Base):
    __tablename__ = "branches"
    id = Column(Integer, primary_key=True)
    name = Column(String(100), unique=True, nullable=False)

    doctors = relationship("Doctor", back_populates="branch")


class Doctor(Base):
    __tablename__ = "doctors"
    id = Column(Integer, primary_key=True)
    full_name = Column(String(100), nullable=False)
    branch_id = Column(Integer, ForeignKey("branches.id"), nullable=False)

    branch = relationship("Branch", back_populates="doctors")
    working_hours = relationship("WorkingHour", back_populates="doctor")
    appointments = relationship("Appointment", back_populates="doctor")


class Patient(Base):
    __tablename__ = "patients"
    id = Column(Integer, primary_key=True)
    full_name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)

    appointments = relationship("Appointment", back_populates="patient")
    records = relationship("MedicalRecord", back_populates="patient")


class WorkingHour(Base):
    __tablename__ = "working_hours"
    id = Column(Integer, primary_key=True)
    doctor_id = Column(Integer, ForeignKey("doctors.id"), nullable=False)
    weekday = Column(Integer, nullable=False)      # 0=Pazartesi ... 6=Pazar
    start_time = Column(Time, nullable=False)       # örn. 09:00
    end_time = Column(Time, nullable=False)         # örn. 17:00

    doctor = relationship("Doctor", back_populates="working_hours")


class Appointment(Base):
    __tablename__ = "appointments"
    id = Column(Integer, primary_key=True)
    patient_id = Column(Integer, ForeignKey("patients.id"), nullable=False)
    doctor_id = Column(Integer, ForeignKey("doctors.id"), nullable=False)
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
    patient_id = Column(Integer, ForeignKey("patients.id"), nullable=False)
    doctor_id = Column(Integer, ForeignKey("doctors.id"), nullable=False)
    appointment_id = Column(Integer, ForeignKey("appointments.id"))
    diagnosis = Column(String(255))
    notes = Column(Text)
    created_at = Column(DateTime, default=datetime.now)

    patient = relationship("Patient", back_populates="records")