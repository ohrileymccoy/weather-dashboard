import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const sampleData = [
  { date: "2025-09-18", temp: 22, humidity: 60 },
  { date: "2025-09-19", temp: 24, humidity: 55 },
  { date: "2025-09-20", temp: 20, humidity: 70 },
];

export default function WeatherChart() {
  return (
    <div className="space-y-6">
      {/* Map Row (full width) */}
      <div className="w-full h-[400px] rounded-lg overflow-hidden shadow">
        <iframe
          src="https://embed.windy.com/embed2.html?lat=39.8283&lon=-98.5795&zoom=4&level=surface&overlay=radar"
          width="100%"
          height="100%"
          frameBorder="0"
          title="Live Doppler Radar"
        ></iframe>
      </div>

      {/* Charts Row (2 columns) */}
      <div className="grid grid-cols-2 gap-6 w-full">
        {/* Temperature Line Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Temperature Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sampleData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="temp" stroke="#2563eb" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Humidity Bar Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Humidity Levels</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sampleData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="humidity" fill="#16a34a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
