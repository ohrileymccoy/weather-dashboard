import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LocalForecast({ city, unit, setUnit }) {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const apiKey = import.meta.env.VITE_OPENWEATHER_KEY;
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city},US&units=metric&appid=${apiKey}`
        );
        const data = await res.json();
        const daily = data.list.filter((entry) =>
          entry.dt_txt.includes("12:00:00")
        );
        setForecast(daily.slice(0, 5));
      } catch (err) {
        console.error(err);
      }
    };
    fetchForecast();
  }, [city]);
// helper to convert
  const toUnit = (c) => (unit === "F" ? Math.round(c * 9/5 + 32) : Math.round(c));
 return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="bg-gray-900/70 rounded-xl shadow-lg backdrop-blur-md p-6 mt-4"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-indigo-300">
          🌤 5-Day Forecast ({city})
        </h3>
        <button
          onClick={() => setUnit(unit === "C" ? "F" : "C")}
          className="px-4 py-1 rounded-lg bg-gray-800/80 text-sm text-indigo-300 hover:bg-indigo-600/30 transition"
        >
          Switch to °{unit === "C" ? "F" : "C"}
        </button>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {forecast.map((day) => (
          <div key={day.dt} className="flex flex-col items-center bg-gray-800/60 p-3 rounded-lg">
            <p className="text-sm text-gray-400">
              {new Date(day.dt_txt).toLocaleDateString("en-US", { weekday: "short" })}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt={day.weather[0].description}
              className="w-12 h-12"
            />
            <p className="font-bold text-white">
              {toUnit(day.main.temp)}°{unit}
            </p>
            <p className="text-xs text-gray-400 capitalize">
              {day.weather[0].description}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}