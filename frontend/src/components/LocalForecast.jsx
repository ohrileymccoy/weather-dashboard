import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LocalForecast({ city }) {
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

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="bg-gray-900/70 rounded-xl shadow-lg backdrop-blur-md p-6 mt-4"
    >
      <h3 className="text-lg font-semibold text-indigo-300 mb-4">
        🌤 5-Day Forecast ({city})
      </h3>
      <div className="grid grid-cols-5 gap-4">
        {forecast.map((day) => (
          <div
            key={day.dt}
            className="flex flex-col items-center bg-gray-800/60 p-3 rounded-lg"
          >
            <p className="text-sm text-gray-400">
              {new Date(day.dt_txt).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt={day.weather[0].description}
              className="w-12 h-12"
            />
            <p className="font-bold text-white">
              {Math.round(day.main.temp)}°C
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