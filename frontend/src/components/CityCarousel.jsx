import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const cities = [
  { name: "Oak Hill", temp: 22, icon: "☀️", desc: "Clear skies" },
  { name: "Beckley", temp: 19, icon: "🌧️", desc: "Light showers" },
  { name: "Charleston", temp: 24, icon: "⛅", desc: "Partly cloudy" },
  { name: "New York", temp: 18, icon: "🌦️", desc: "Showers" },
  { name: "Los Angeles", temp: 27, icon: "☀️", desc: "Sunny" },
];

export default function OrbitingCityCards() {
  const [angle, setAngle] = useState(0);

  // orbit rotation
  useEffect(() => {
    const id = setInterval(() => {
      setAngle((prev) => prev + 1); // degrees per tick
    }, 50);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative flex items-start justify-center h-[700px] pt-8 -translate-y-20">
      <div className="relative w-[500px] h-[500px] perspective-[1200px]">
        {/* Holographic Globe */}
        <div
          className="absolute top-1/2 left-1/2 w-56 h-56 -translate-x-1/2 -translate-y-1/2 
                     rounded-full bg-gradient-to-br from-cyan-500 to-indigo-800 
                     shadow-[0_0_60px_rgba(0,255,255,0.5)] relative overflow-hidden"
        >
          {/* spinning longitude/latitude lines */}
          <div className="absolute inset-0 rounded-full border border-cyan-400/30 animate-spin-slow" />
          <div className="absolute inset-4 rounded-full border border-cyan-400/20 animate-spin-slow-reverse" />
        </div>

        {/* Orbiting Cards */}
        {cities.map((city, i) => {
          const step = (2 * Math.PI) / cities.length;
          const cardAngle = angle * (Math.PI / 180) + i * step;

          // Orbit math
          const radius = 220;
          const x = Math.cos(cardAngle) * radius;
          const z = Math.sin(cardAngle) * radius;

          // Depth effects
          const scale = 0.6 + (z / radius) * 0.4; // closer = bigger
          const opacity = 0.5 + (z / radius) * 0.5; // fade behind
          const zIndex = Math.round(z * 1000);

          return (
            <motion.div
              key={city.name}
              style={{
                transform: `translate3d(${x}px, 0px, ${z}px) scale(${scale})`,
                zIndex,
                opacity,
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                         w-40 h-56 bg-gray-900/80 text-center rounded-xl p-4 
                         backdrop-blur-md shadow-lg text-white flex flex-col justify-center
                         transition-transform duration-300 hover:scale-110"
            >
              <div className="text-4xl mb-2">{city.icon}</div>
              <h3 className="font-bold text-lg">{city.name}</h3>
              <p className="text-indigo-300">{city.temp}°C</p>
              <p className="text-gray-400 text-sm italic">{city.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
