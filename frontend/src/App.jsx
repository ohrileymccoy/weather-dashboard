import { useState } from "react";
import NavBar from "./components/NavBar";
import CityCarousel from "./components/CityCarousel"; // OrbitingCityCards
import WeatherChart from "./components/WeatherChart";
import LocalForecast from "./components/LocalForecast";

export default function App() {
  const [activeCity, setActiveCity] = useState("Oak Hill");

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 container mx-auto px-6 mt-24">
        {/* Two main columns on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT SIDE: Carousel + Forecast stacked */}
          <div className="flex flex-col gap-6">
            <div className="flex justify-center items-start p-4">
              <CityCarousel
                onSelectCity={setActiveCity}
                activeCity={activeCity}
              />
            </div>
            <LocalForecast city={activeCity} />
          </div>

          {/* RIGHT SIDE: WeatherChart stays untouched (map + graphs stack) */}
          <div>
            <WeatherChart />
          </div>
        </div>
      </main>
    </div>
  );
}
