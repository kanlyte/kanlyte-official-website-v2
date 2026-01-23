"use client";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  const handleGoHome = () => {
    window.location.href = "/";
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex items-center justify-center px-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-emerald-400/10 to-green-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-gradient-to-br from-green-400/10 to-emerald-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-lg mx-auto text-center relative z-10">
        {/* Main Content */}
        <div className="mb-10">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute -inset-6 bg-[#6EBE45]/20 rounded-full blur-2xl"></div>
              <div className="relative bg-white rounded-full p-8 shadow-lg border border-emerald-100">
                <div className="text-7xl font-bold text-[#6EBE45]">404</div>
              </div>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Oops! Page not found
          </h1>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved. Let&apos;s get you back on track.
          </p>
        </div>

        {/* Action Buttons - Simplified */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleGoHome}
            className="group flex items-center gap-3 px-8 py-4 bg-[#6EBE45] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#5DA83C]"
          >
            <Home className="w-5 h-5" />
            Go Back Home
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform rotate-180" />
          </button>

          <button
            onClick={handleGoBack}
            className="flex items-center gap-3 px-8 py-4 bg-white text-slate-700 rounded-xl font-semibold border border-slate-200 hover:bg-slate-50 hover:shadow-lg transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>

        {/* Optional decorative elements */}
        <div className="mt-12 flex justify-center">
          <div className="flex space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-[#6EBE45]/40"
                style={{
                  animation: `pulse 1.5s ease-in-out ${i * 0.2}s infinite`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Add custom animation */}
      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  );
}
