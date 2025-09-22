import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const data = [
  { date: "2025-09-18", temp: 22, humidity: 60 },
  { date: "2025-09-19", temp: 24, humidity: 55 },
  { date: "2025-09-20", temp: 20, humidity: 70 },
];

export default function WeatherChart() {
  return (
    <div className="space-y-8 mt-10">
      {/* Doppler Radar Map */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="w-full h-[400px] rounded-xl overflow-hidden shadow-lg bg-gray-900/70 backdrop-blur-md"
      >
        <iframe
          src="https://embed.windy.com/embed2.html?lat=39.8283&lon=-98.5795&zoom=4&level=surface&overlay=radar"
          width="100%"
          height="100%"
          frameBorder="0"
          title="Live Doppler Radar"
        ></iframe>
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-6">
        {/* Temperature Line Chart */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gray-900/70 p-4 rounded-xl shadow-lg backdrop-blur-md"
        >
          <h3 className="text-lg font-semibold mb-2 text-indigo-300">🌡 Temperature Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="date" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Line type="monotone" dataKey="temp" stroke="#60a5fa" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Humidity Bar Chart */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gray-900/70 p-4 rounded-xl shadow-lg backdrop-blur-md"
        >
          <h3 className="text-lg font-semibold mb-2 text-emerald-300">💧 Humidity Levels</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="date" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Bar dataKey="humidity" fill="#34d399" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}
