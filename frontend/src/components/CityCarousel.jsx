import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import globeImg from "../assets/globe.png";

const baseCities = [
  "Oak Hill",
  "Beckley",
  "Charleston",
  "Morgantown",
  "Huntington",
];

export default function CityCarousel({ onSelectCity, unit }) {
  const [angle, setAngle] = useState(0);
  const [cities, setCities] = useState([]);
  const [activeCity, setActiveCity] = useState(null);

  // Fetch live weather data (always metric)
  useEffect(() => {
    const apiKey = import.meta.env.VITE_OPENWEATHER_KEY;
    if (!apiKey) {
      console.error("⚠️ Missing VITE_OPENWEATHER_KEY");
      return;
    }

    Promise.all(
      baseCities.map(async (city) => {
        try {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city},US&units=metric&appid=${apiKey}`
          );
          const data = await res.json();
          return {
            name: city,
            tempC: Math.round(data.main.temp),
            icon: data.weather[0].icon,
            desc: data.weather[0].description,
          };
        } catch (err) {
          console.error("Weather fetch failed for:", city, err);
          return {
            name: city,
            tempC: null,
            icon: "01d",
            desc: "Unavailable",
          };
        }
      })
    ).then(setCities);
  }, []);

  // Orbit rotation
  useEffect(() => {
    const id = setInterval(() => {
      setAngle((prev) => prev + 1);
    }, 50);
    return () => clearInterval(id);
  }, []);

  // Helper: Celsius → F conversion
  const formatTemp = (tempC) => {
    if (tempC == null || tempC === "--") return "--";
    return unit === "F" ? Math.round(tempC * 9 / 5 + 32) : tempC;
  };

  return (
    <div className="relative flex justify-center items-start h-full">
      <div className="relative w-[380px] h-[380px] perspective-[1200px] mt-2">
        {/* 🌍 Rotating Globe */}
        <div
          className="absolute top-0 left-1/2 w-56 h-56 -translate-x-1/2 rounded-full 
                     shadow-[0_0_60px_rgba(0,255,255,0.5)] overflow-hidden"
        >
          <img
            src={globeImg}
            alt="Digital Globe"
            className="w-full h-full object-cover animate-spin-slow opacity-90"
          />
          {/* holographic overlays */}
          <div className="absolute inset-0 rounded-full border border-cyan-400/30 animate-spin-slow pointer-events-none" />
          <div className="absolute inset-4 rounded-full border border-cyan-400/20 animate-spin-slow-reverse pointer-events-none" />
        </div>

        {/* Orbiting City Cards */}
        {cities.map((city, i) => {
          const step = (2 * Math.PI) / cities.length;
          const cardAngle = angle * (Math.PI / 180) + i * step;

          const radius = 170;
          const x = Math.cos(cardAngle) * radius;
          const z = Math.sin(cardAngle) * radius;

          const scale = 0.6 + (z / radius) * 0.4;

          let opacity = 0.5 + (z / radius) * 0.5;
          opacity = Math.max(0, Math.min(1, opacity));
          opacity = Math.pow(opacity, 1.5);

          const zIndex = Math.round(z * 1000);
          const isActive = activeCity === city.name;

          return (
            <motion.div
              key={city.name}
              onClick={() => {
                setActiveCity(city.name);
                onSelectCity?.(city.name);
              }}
              style={{
                transform: `translate3d(${x}px, 40px, ${z}px) scale(${
                  scale * (isActive ? 1.05 : 1)
                })`,
                zIndex,
                opacity,
              }}
              className={`absolute left-1/2 top-0 -translate-x-1/2
                         w-40 h-56 text-center rounded-xl p-4 
                         backdrop-blur-md shadow-lg flex flex-col justify-center cursor-pointer
                         transition duration-300
                         ${
                           isActive
                             ? "bg-gradient-to-br from-cyan-500/80 to-indigo-700/80 shadow-[0_0_35px_rgba(0,200,255,0.9)]"
                             : "bg-gray-900/80"
                         }`}
            >
              <img
                src={`https://openweathermap.org/img/wn/${city.icon}@2x.png`}
                alt={city.desc}
                className="w-12 h-12 mx-auto mb-2"
              />
              <h3 className="font-bold text-lg">{city.name}</h3>
              <p className="text-indigo-300">
                {formatTemp(city.tempC)}°{unit}
              </p>
              <p className="text-gray-400 text-sm italic capitalize">
                {city.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
