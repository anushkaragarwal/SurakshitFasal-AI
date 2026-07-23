import os
import json
import base64
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY"),
)


def analyze_leaf(image_path, language="en"):

    with open(image_path, "rb") as image:
        image_base64 = base64.b64encode(image.read()).decode("utf-8")

    language_instruction = (
        "Respond in simple Hindi using Devanagari script."
        if language == "hi"
        else "Respond in English."
    )

    response = client.chat.completions.create(
        model="openrouter/auto",
        temperature=0.2,
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": f"""
You are an expert agricultural AI.

Analyze this plant leaf image carefully.

{language_instruction}

Return ONLY valid JSON.

{{
    "crop":"",
    "disease":"",
    "confidence":"",
    "severity":"",
    "recommendation":"",
    "dosage":"",
    "precautions":""
}}
"""
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/png;base64,{image_base64}"
                        }
                    }
                ]
            }
        ]
    )

    result = response.choices[0].message.content

    # Remove markdown if AI returns ```json
    result = result.replace("```json", "").replace("```", "").strip()

    # Extract JSON if AI adds extra text
    start = result.find("{")
    end = result.rfind("}") + 1

    if start != -1 and end != -1:
        result = result[start:end]

    try:
        return json.loads(result)

    except Exception:
        return {
            "error": "AI returned invalid JSON",
            "raw_response": result
        }