from sqlalchemy import Column, Integer, String
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

    image_path = Column(String)