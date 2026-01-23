"use client";

import { Play } from "lucide-react";
import { useEffect, useState } from "react";

export default function BookDemoButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClick = () => {
    window.open("https://calendar.app.google/8KuE8w7ToNnGaJhV9", "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className={`fixed bottom-8 right-8 flex items-center gap-3 bg-[#6EBE45] hover:bg-[#5fa539] text-white font-semibold px-6 py-4 rounded-full shadow-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95 z-50 group backdrop-blur-sm ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{
        boxShadow: isVisible ? "0 20px 40px rgba(110, 190, 69, 0.3)" : "none",
      }}
      aria-label="Book Odoo demo"
    >
      <span className="absolute inset-0 rounded-full bg-[#6EBE45] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />

      {/* Icon with enhanced animation */}
      <div className="relative z-10 flex items-center">
        <Play className="w-5 h-5 fill-current group-hover:animate-pulse" />
      </div>

      {/* Text label */}
      <span className="relative z-10 text-sm md:text-base whitespace-nowrap">
        Book Odoo demo Now
      </span>
    </button>
  );
}
