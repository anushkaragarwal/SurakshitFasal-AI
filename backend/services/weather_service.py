import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("WEATHER_API_KEY")


def get_weather(city):
    url = (
        f"http://api.weatherapi.com/v1/current.json"
        f"?key={API_KEY}&q={city}&aqi=no"
    )

    response = requests.get(url)

    if response.status_code != 200:
        return {
            "error": "Unable to fetch weather"
        }

    data = response.json()

    return {
        "city": data["location"]["name"],
        "temperature": data["current"]["temp_c"],
        "humidity": data["current"]["humidity"],
        "condition": data["current"]["condition"]["text"],
        "wind_kph": data["current"]["wind_kph"]
    }