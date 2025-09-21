import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const sampleData = [
  { date: "2025-09-18", temp: 22, humidity: 60 },
  { date: "2025-09-19", temp: 24, humidity: 55 },
  { date: "2025-09-20", temp: 20, humidity: 70 },
];

export default function WeatherChart() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Temperature Line Chart */}
      <div className="flex justify-center items-center">
        <LineChart width={350} height={300} data={sampleData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="temp" stroke="#2563eb" />
        </LineChart>
      </div>

      {/* Humidity Bar Chart */}
      <div className="flex justify-center items-center">
        <BarChart width={350} height={300} data={sampleData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="humidity" fill="#16a34a" />
        </BarChart>
      </div>

      {/* Doppler Radar Map (iframe embed) */}
      <div className="w-full h-[300px] rounded-lg overflow-hidden shadow">
        <iframe
          src="https://embed.windy.com/embed2.html?lat=39.8283&lon=-98.5795&zoom=4&level=surface&overlay=radar"
          width="100%"
          height="100%"
          frameBorder="0"
          title="Live Doppler Radar"
        ></iframe>
      </div>
    </div>
  );
}
