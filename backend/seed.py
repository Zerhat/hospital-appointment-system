import hashlib
from datetime import time
from database import SessionLocal, engine, Base
from models import Branch, Doctor, WorkingHour, Patient

Base.metadata.create_all(bind=engine)
db = SessionLocal()

# Daha önce eklendiyse tekrar ekleme
if db.query(Branch).count() > 0:
    print("Veriler zaten eklenmiş, işlem yapılmadı.")
    db.close()
    exit()

# 1) Branşlar
branch_names = ["Dahiliye", "Kardiyoloji", "Kulak Burun Boğaz", "Ortopedi",
                "Nöroloji", "Dermatoloji", "Göz Hastalıkları", "Çocuk Sağlığı"]
branches = {name: Branch(name=name) for name in branch_names}
db.add_all(branches.values())
db.commit()

# 2) Doktorlar (her branşa 2 doktor)
doctor_data = {
    "Dahiliye": ["Dr. Ayşe Yılmaz", "Dr. Mehmet Demir"],
    "Kardiyoloji": ["Dr. Ali Kaya", "Dr. Zeynep Şahin"],
    "Kulak Burun Boğaz": ["Dr. Elif Çelik", "Dr. Burak Aydın"],
    "Ortopedi": ["Dr. Can Öztürk", "Dr. Selin Arslan"],
    "Nöroloji": ["Dr. Emre Doğan", "Dr. Deniz Kılıç"],
    "Dermatoloji": ["Dr. Merve Koç", "Dr. Oğuz Yıldız"],
    "Göz Hastalıkları": ["Dr. Ece Aksoy", "Dr. Kerem Polat"],
    "Çocuk Sağlığı": ["Dr. Buse Erdem", "Dr. Tolga Güneş"],
}
doctors = []
for branch_name, names in doctor_data.items():
    for name in names:
        doctors.append(Doctor(full_name=name, branch=branches[branch_name]))
db.add_all(doctors)
db.commit()

# 3) Çalışma saatleri: Pazartesi-Cuma, 09:00-17:00
for doctor in doctors:
    for weekday in range(5):  # 0=Pzt ... 4=Cuma
        db.add(WorkingHour(doctor_id=doctor.id, weekday=weekday,
                           start_time=time(9, 0), end_time=time(17, 0)))
db.commit()

# 4) Test hastası (şifre: 123456)
# Şimdilik basit SHA-256 hash; finalde bcrypt'e geçilecek
test_patient = Patient(
    full_name="Test Hasta",
    email="hasta@test.com",
    password_hash=hashlib.sha256("123456".encode()).hexdigest(),
)
db.add(test_patient)
db.commit()

print(f"{len(branches)} branş, {len(doctors)} doktor, çalışma saatleri ve 1 test hastası eklendi.")
db.close()