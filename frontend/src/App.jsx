import NavBar from "./components/NavBar";
import CityCarousel from "./components/CityCarousel";
import WeatherChart from "./components/WeatherChart";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 container mx-auto px-6 mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Orbital Carousel */}
        <div className="col-span-1 lg:col-span-2 flex justify-center items-center p-4">
  <CityCarousel />
</div>

          {/* Weather Chart block */}
          <div className="col-span-1 lg:col-span-2">
            <WeatherChart />
          </div>

          {/* Example placeholders for more widgets */}
          <div className="bg-gray-900/70 rounded-xl shadow-lg p-4">Widget 1</div>
          <div className="bg-gray-900/70 rounded-xl shadow-lg p-4">Widget 2</div>
          <div className="bg-gray-900/70 rounded-xl shadow-lg p-4">Widget 3</div>
          <div className="bg-gray-900/70 rounded-xl shadow-lg p-4">Widget 4</div>
        </div>
      </main>
    </div>
  );
}
