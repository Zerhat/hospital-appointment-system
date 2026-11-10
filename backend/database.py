from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# hospital.db adında bir SQLite dosyası kullanacağız
DATABASE_URL = "sqlite:///./hospital.db"

# engine: veritabanına bağlantıyı yöneten nesne
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

# SessionLocal: her istekte veritabanıyla konuşmak için açılan oturum
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

# Base: tüm tablolarımız (modellerimiz) bundan türeyecek
Base = declarative_base()


def get_db():
    """Her API isteğinde bir veritabanı oturumu açar, iş bitince kapatır."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()