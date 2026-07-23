from fastapi import FastAPI, UploadFile, File, Depends, Form
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
import shutil
import os

from ai.analyzer import analyze_leaf
from database.database import get_db
from database.crud import save_report
from database.models import CropReport
from services.weather_service import get_weather
from reports.pdf_service import generate_pdf

app = FastAPI()


@app.get("/")
def home():
    return {
        "message": "🌿 Surakshit Fasal AI Backend Running Successfully!"
    }


@app.post("/analyze")
async def analyze(
    file: UploadFile = File(...),
    language: str = Form("en"),
    city: str = Form("Delhi"),
    db: Session = Depends(get_db)
):
    # Create uploads folder
    os.makedirs("uploads", exist_ok=True)

    # Save uploaded image
    file_path = os.path.join("uploads", file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # AI Analysis
    result = analyze_leaf(file_path, language)

    if "error" in result:
        return result

    # Store city
    result["city"] = city

    # Get Weather
    weather = get_weather(city)
    result["weather"] = weather

    # Weather Advice
    if weather and "condition" in weather:

        condition = weather["condition"].lower()

        if "rain" in condition:

            result["weather_advice"] = (
                "बारिश की संभावना है। आज दवा का छिड़काव न करें।"
                if language == "hi"
                else "Rain is expected today. Avoid spraying pesticides."
            )

        elif weather.get("wind_kph", 0) > 20:

            result["weather_advice"] = (
                "तेज हवा चल रही है। अभी छिड़काव न करें।"
                if language == "hi"
                else "Strong winds detected. Avoid spraying."
            )

        elif weather.get("temperature", 0) > 35:

            result["weather_advice"] = (
                "तापमान अधिक है। शाम को छिड़काव करें।"
                if language == "hi"
                else "Temperature is high. Spray during the evening."
            )

        else:

            result["weather_advice"] = (
                "मौसम अनुकूल है। आज छिड़काव किया जा सकता है।"
                if language == "hi"
                else "Weather is suitable for spraying."
            )

    # Generate PDF
    pdf_path = generate_pdf(result)
    result["pdf_report"] = pdf_path

    # Save Report
    save_report(db, result, file_path)

    return result


@app.get("/history")
def get_history(db: Session = Depends(get_db)):

    reports = db.query(CropReport).all()

    return [
        {
            "id": report.id,
            "crop": report.crop,
            "disease": report.disease,
            "confidence": report.confidence,
            "severity": report.severity,
            "recommendation": report.recommendation,
            "dosage": report.dosage,
            "precautions": report.precautions,
            "harvest_waiting_period": report.harvest_waiting_period,
            "city": report.city,
            "image_path": report.image_path,
            "pdf_path": report.pdf_path,
            "created_at": report.created_at,
        }
        for report in reports
    ]


@app.get("/download-report/{report_id}")
def download_report(report_id: int, db: Session = Depends(get_db)):

    report = db.query(CropReport).filter(CropReport.id == report_id).first()

    if not report:
        return {"error": "Report not found"}

    return FileResponse(
        report.pdf_path,
        media_type="application/pdf",
        filename=f"Report_{report.crop}.pdf",
    )


@app.post("/generate-pdf")
def create_pdf(report: dict):

    pdf_path = generate_pdf(report)

    return FileResponse(
        pdf_path,
        media_type="application/pdf",
        filename="SurakshitFasal_Report.pdf",
    )