"""
Örnek veri üretici.
- 81 il ve 973 ilçe: data/turkey_cities.json (PTT posta kodu verisi)
- Her ilçeye bir devlet hastanesi, büyükşehirlerin merkezine şehir ve
  eğitim-araştırma hastanesi
- 21 klinik (branş), her hastanede klinik başına 1-4 doktor
Doktor isimleri rastgele üretilmiştir (gerçek kişiler değildir).

Kullanım:  python seed.py          (veritabanı boşsa doldurur)
           python seed.py --reset  (veritabanını silip baştan oluşturur)
"""
import hashlib
import json
import os
import random
import sys
from datetime import time

from database import SessionLocal, engine, Base
import models

random.seed(42)  # her çalıştırmada aynı veri üretilsin

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

BRANCHES = [
    "İç Hastalıkları (Dahiliye)", "Çocuk Sağlığı ve Hastalıkları", "Kadın Hastalıkları ve Doğum",
    "Genel Cerrahi", "Ortopedi ve Travmatoloji", "Kulak Burun Boğaz Hastalıkları",
    "Göz Hastalıkları", "Kardiyoloji", "Nöroloji", "Dermatoloji (Cildiye)", "Üroloji",
    "Göğüs Hastalıkları", "Fiziksel Tıp ve Rehabilitasyon", "Ruh Sağlığı ve Hastalıkları (Psikiyatri)",
    "Endokrinoloji ve Metabolizma Hastalıkları", "Gastroenteroloji", "Beyin ve Sinir Cerrahisi",
    "Enfeksiyon Hastalıkları", "Romatoloji", "Nefroloji", "Kalp ve Damar Cerrahisi",
]
SURGICAL = {"Genel Cerrahi", "Ortopedi ve Travmatoloji", "Kulak Burun Boğaz Hastalıkları",
            "Göz Hastalıkları", "Üroloji", "Beyin ve Sinir Cerrahisi",
            "Kalp ve Damar Cerrahisi", "Kadın Hastalıkları ve Doğum"}
# İlçe devlet hastanelerinde bulunabilecek temel klinikler
CORE_BRANCHES = BRANCHES[:14]

# Büyükşehirlerin merkez ilçeleri (şehir hastaneleri buraya eklenir)
METRO_CENTERS = {
    "Adana": "Seyhan", "Ankara": "Çankaya", "Antalya": "Muratpaşa", "Aydın": "Efeler",
    "Balıkesir": "Karesi", "Bursa": "Osmangazi", "Denizli": "Pamukkale", "Diyarbakır": "Bağlar",
    "Erzurum": "Yakutiye", "Eskişehir": "Odunpazarı", "Gaziantep": "Şehitkamil", "Hatay": "Antakya",
    "İstanbul": "Fatih", "İzmir": "Konak", "Kahramanmaraş": "Onikişubat", "Kayseri": "Melikgazi",
    "Kocaeli": "İzmit", "Konya": "Selçuklu", "Malatya": "Battalgazi", "Manisa": "Şehzadeler",
    "Mardin": "Artuklu", "Mersin": "Yenişehir", "Muğla": "Menteşe", "Ordu": "Altınordu",
    "Sakarya": "Adapazarı", "Samsun": "İlkadım", "Şanlıurfa": "Haliliye", "Tekirdağ": "Süleymanpaşa",
    "Trabzon": "Ortahisar", "Van": "İpekyolu",
}

FIRST_NAMES = [
    "Ahmet", "Mehmet", "Mustafa", "Ali", "Hüseyin", "Hasan", "İbrahim", "Murat", "Emre", "Burak",
    "Can", "Kerem", "Oğuz", "Tolga", "Serkan", "Volkan", "Onur", "Barış", "Cem", "Deniz",
    "Kaan", "Selim", "Yusuf", "Furkan", "Eren", "Gökhan", "Erkan", "Levent", "Umut", "Arda",
    "Ayşe", "Fatma", "Zeynep", "Elif", "Merve", "Esra", "Büşra", "Selin", "Ece", "Derya",
    "Gamze", "Seda", "Pınar", "Burcu", "Ebru", "Aslı", "Gizem", "Melike", "Sevgi", "Tuğba",
    "Nur", "Hande", "İrem", "Duygu", "Ceren", "Buse", "Yasemin", "Özlem", "Sibel", "Dilek",
]
LAST_NAMES = [
    "Yılmaz", "Kaya", "Demir", "Şahin", "Çelik", "Yıldız", "Yıldırım", "Öztürk", "Aydın", "Özdemir",
    "Arslan", "Doğan", "Kılıç", "Aslan", "Çetin", "Kara", "Koç", "Kurt", "Özkan", "Şimşek",
    "Polat", "Özcan", "Korkmaz", "Erdoğan", "Güneş", "Aksoy", "Tekin", "Bulut", "Erdem", "Keskin",
    "Ünal", "Uçar", "Acar", "Güler", "Karaca", "Bozkurt", "Tuncer", "Akın", "Çakır", "Sönmez",
    "Taş", "Uysal", "Ateş", "Altun", "Yavuz", "Avcı", "Coşkun", "Ekinci", "Duman", "Gündüz",
]


def random_name():
    return f"{random.choice(FIRST_NAMES)} {random.choice(LAST_NAMES)}"


def random_title(branch_name, big_hospital):
    r = random.random()
    if big_hospital and r < 0.10:
        return "Prof. Dr."
    if big_hospital and r < 0.25:
        return "Doç. Dr."
    return "Op. Dr." if branch_name in SURGICAL else "Uzm. Dr."


def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()


def main():
    if "--reset" in sys.argv:
        Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    if db.query(models.City).count() > 0:
        print("Veriler zaten eklenmiş. Baştan oluşturmak için: python seed.py --reset")
        db.close()
        return

    with open(os.path.join(BASE_DIR, "data", "turkey_cities.json"), encoding="utf-8") as f:
        cities = json.load(f)

    # 1) Branşlar
    branch_ids = {}
    for i, name in enumerate(BRANCHES, start=1):
        branch_ids[name] = i
    db.bulk_insert_mappings(models.Branch, [{"id": i, "name": n} for n, i in branch_ids.items()])

    # 2) İl, ilçe, hastane, doktor, çalışma saati
    city_rows, district_rows, hospital_rows, doctor_rows, hour_rows = [], [], [], [], []
    district_id = hospital_id = doctor_id = hour_id = 0

    def add_hospital(name, h_type, d_id, branch_list, doctors_range, big):
        nonlocal hospital_id, doctor_id, hour_id
        hospital_id += 1
        hospital_rows.append({"id": hospital_id, "name": name,
                              "hospital_type": h_type, "district_id": d_id})
        for b in branch_list:
            for _ in range(random.randint(*doctors_range)):
                doctor_id += 1
                doctor_rows.append({"id": doctor_id, "title": random_title(b, big),
                                    "full_name": random_name(), "branch_id": branch_ids[b],
                                    "hospital_id": hospital_id})
                for weekday in range(5):  # Pazartesi-Cuma 09:00-17:00
                    hour_id += 1
                    hour_rows.append({"id": hour_id, "doctor_id": doctor_id, "weekday": weekday,
                                      "start_time": time(9, 0), "end_time": time(17, 0)})

    for c_index, city in enumerate(cities, start=1):
        city_rows.append({"id": c_index, "plate_code": city["plate"], "name": city["name"]})
        for d_name in city["districts"]:
            district_id += 1
            district_rows.append({"id": district_id, "name": d_name, "city_id": c_index})

            is_center = d_name == "Merkez" or METRO_CENTERS.get(city["name"]) == d_name
            base = city["name"] if d_name == "Merkez" else d_name

            if is_center:
                # İl merkezi: tüm kliniklerin olduğu büyük hastaneler
                add_hospital(f"{city['name']} Şehir Hastanesi", "Şehir Hastanesi",
                             district_id, BRANCHES, (2, 4), True)
                add_hospital(f"{city['name']} Eğitim ve Araştırma Hastanesi",
                             "Eğitim ve Araştırma Hastanesi", district_id, BRANCHES, (1, 3), True)
            else:
                # İlçe devlet hastanesi: temel kliniklerin bir kısmı
                branch_list = random.sample(CORE_BRANCHES, random.randint(6, len(CORE_BRANCHES)))
                add_hospital(f"{base} Devlet Hastanesi", "Devlet Hastanesi",
                             district_id, branch_list, (1, 2), False)

    db.bulk_insert_mappings(models.City, city_rows)
    db.bulk_insert_mappings(models.District, district_rows)
    db.bulk_insert_mappings(models.Hospital, hospital_rows)
    db.bulk_insert_mappings(models.Doctor, doctor_rows)
    db.bulk_insert_mappings(models.WorkingHour, hour_rows)

    # 3) Test hastası (şifre: 123456)
    db.add(models.Patient(full_name="Test Hasta", email="hasta@test.com",
                          password_hash=hash_password("123456")))
    db.commit()
    db.close()

    print(f"{len(city_rows)} il, {len(district_rows)} ilçe, {len(hospital_rows)} hastane, "
          f"{len(BRANCHES)} klinik, {len(doctor_rows)} doktor eklendi.")
    print("Test hastası: hasta@test.com / 123456")


if __name__ == "__main__":
    main()