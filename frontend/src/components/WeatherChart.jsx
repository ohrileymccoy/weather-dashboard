import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

export default function WeatherChart({ city = "Oak Hill", unit }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const apiKey = import.meta.env.VITE_OPENWEATHER_KEY;
        if (!apiKey) {
          console.error("⚠️ Missing VITE_OPENWEATHER_KEY in .env");
          return;
        }

        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city},US&units=metric&appid=${apiKey}`
        );
        const raw = await res.json();

        if (!res.ok || !raw.list) {
          console.error("Weather API error:", raw);
          setData([]);
          return;
        }

        // Grab next 5 days at noon
        const daily = raw.list
          .filter((entry) => entry.dt_txt.includes("12:00:00"))
          .slice(0, 5)
          .map((entry) => ({
            date: new Date(entry.dt_txt).toLocaleDateString("en-US", {
              weekday: "short",
            }),
            tempC: Math.round(entry.main.temp),
            humidity: entry.main.humidity,
          }));

        setData(daily);
      } catch (err) {
        console.error("WeatherChart fetch error:", err);
      }
    };

    fetchForecast();
  }, [city]);

  // Convert based on shared unit prop
  const displayData =
    unit === "F"
      ? data.map((d) => ({
          ...d,
          temp: Math.round(d.tempC * 9 / 5 + 32),
        }))
      : data.map((d) => ({ ...d, temp: d.tempC }));

  return (
    <div className="space-y-8 mt-10">
      {/* Doppler Radar */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="w-full h-[400px] rounded-xl overflow-hidden shadow-lg bg-gray-900/70 backdrop-blur-md"
      >
        <iframe
          src="https://embed.windy.com/embed2.html?lat=37.9729&lon=-81.1487&zoom=8&level=surface&overlay=radar"
          width="100%"
          height="100%"
          frameBorder="0"
          title={`${city} Doppler Radar`}
        ></iframe>
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 min-w-0">
        {/* Temp Trend */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gray-900/70 p-4 rounded-xl shadow-lg backdrop-blur-md min-w-0"
        >
          <h3 className="text-lg font-semibold mb-2 text-indigo-300">
            🌡 Temperature Trend (°{unit})
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={displayData}>
              <XAxis dataKey="date" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip
                formatter={(value) => `${value}°${unit}`}
                labelStyle={{ color: "#fff" }}
              />
              <Line
                type="monotone"
                dataKey="temp"
                stroke="#60a5fa"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Humidity Levels */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gray-900/70 p-4 rounded-xl shadow-lg backdrop-blur-md min-w-0"
        >
          <h3 className="text-lg font-semibold mb-2 text-emerald-300">
            💧 Humidity Levels (%)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={displayData}>
              <XAxis dataKey="date" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip formatter={(value) => `${value}%`} />
              <Bar dataKey="humidity" fill="#34d399" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}
