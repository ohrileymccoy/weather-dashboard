import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = ["Dashboard", "Markets", "Cities", "Analytics", "Settings"];

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full fixed top-0 z-50 px-6 py-3 flex justify-between items-center 
                 backdrop-blur-xl bg-gray-900/50 shadow-lg"
    >
      {/* Left: Brand */}
      <h1 className="text-xl font-bold text-indigo-400 tracking-wider">
        🌐 WeatherChain
      </h1>

      {/* Right: Menu */}
      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded-lg hover:bg-white/10 transition"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-3 w-48 rounded-xl shadow-xl z-[9999]
           bg-gray-800/90 backdrop-blur-lg overflow-hidden"

            >
              {navItems.map((item) => (
                <div
                  key={item}
                  className="px-4 py-2 hover:bg-indigo-600 cursor-pointer transition"
                >
                  {item}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
