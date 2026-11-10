from fastapi import FastAPI
from database import engine, Base
import models  # tabloların tanınması için import ediyoruz

# Uygulama başlarken tablolar yoksa oluşturulur
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Hospital Appointment System")

@app.get("/")
def home():
    return {"message": "Hospital Appointment System çalışıyor!"}