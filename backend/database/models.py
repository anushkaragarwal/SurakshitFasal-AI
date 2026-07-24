from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from database.database import Base


class CropReport(Base):
    __tablename__ = "crop_reports"

    id = Column(Integer, primary_key=True, index=True)

    crop = Column(String)
    disease = Column(String)
    confidence = Column(String)
    severity = Column(String)

    recommendation = Column(String)
    dosage = Column(String)
    precautions = Column(String)

    harvest_waiting_period = Column(String)

    city = Column(String)

    image_path = Column(String)
    pdf_path = Column(String)

    created_at = Column(DateTime, default=datetime.utcnow)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)

    role = Column(String)

    state = Column(String)
    district = Column(String)
    village = Column(String)