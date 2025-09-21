import Layout from "./components/Layout";
import WeatherChart from "./components/WeatherChart";

export default function App() {
  return (
    <Layout>
      <h2 className="text-2xl font-semibold mb-4">Weather Trends</h2>
      <WeatherChart />
    </Layout>
  );
}
