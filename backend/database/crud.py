from .models import CropReport
from .models import User

def get_user_by_email(db, email):
    return db.query(User).filter(User.email == email).first()


def create_user(db, user_data):
    user = User(**user_data)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def save_report(db, data, image_path):

    report = CropReport(
        crop=data.get("crop"),
        disease=data.get("disease"),
        confidence=data.get("confidence"),
        severity=data.get("severity"),
        recommendation=data.get("recommendation"),
        dosage=data.get("dosage"),
        precautions=data.get("precautions"),
        harvest_waiting_period=data.get("harvest_waiting_period"),
        city=data.get("city"),
        pdf_path=data.get("pdf_report"),
        image_path=image_path
        
 ) 

    db.add(report)
    db.commit()
    db.refresh(report)

    return report