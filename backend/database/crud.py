from .models import CropReport


def save_report(db, data, image_path):

    report = CropReport(
        crop=data.get("crop"),
        disease=data.get("disease"),
        confidence=data.get("confidence"),
        severity=data.get("severity"),
        recommendation=data.get("recommendation"),
        dosage=data.get("dosage"),
        precautions=data.get("precautions"),
        image_path=image_path
    )

    db.add(report)
    db.commit()
    db.refresh(report)

    return report