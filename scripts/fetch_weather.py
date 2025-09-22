import os, requests, datetime
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("OPENWEATHER_KEY")
BASE_URL = "http://api.openweathermap.org/data/2.5/weather"

CITIES = ["Oak Hill", "Beckley", "Charleston"]

for city in CITIES:
    r = requests.get(BASE_URL, params={"q": city, "appid": API_KEY, "units": "metric"})
    data = r.json()

    if "main" not in data:
        print(f"Error fetching {city}: {data}")
        continue

    payload = {
        "city": city,
        "date": datetime.date.today().isoformat(),
        "temp": data["main"]["temp"],
        "humidity": data["main"]["humidity"]
    }

    res = requests.post("http://localhost:8788/api/v1/addWeather", json=payload)
    print(city, res.status_code, res.text)
