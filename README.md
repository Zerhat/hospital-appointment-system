# Hospital Appointment System
CEN317 Engineering Design – Sevilay Çelik, Rumeysa Çiçek, Serhat Şemal Can

## Kurulum
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python seed.py
uvicorn main:app --reload
```
API dokümantasyonu: http://127.0.0.1:8000/docs