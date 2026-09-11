"use client";
import { useEffect, useState } from "react";
import {
  Home,
  ArrowLeft,
  RefreshCw,
  AlertTriangle,
  Zap,
  MessageCircle,
  ExternalLink,
} from "lucide-react";

// Custom Error Page Component
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Next redacts the real message from the client bundle in production, but
  // still logs this on the server -- check server/process-manager logs for
  // the matching digest to see the actual thrown error.
  useEffect(() => {
    console.error("[app/error.tsx]", error);
  }, [error]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    reset();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center px-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-red-400/10 to-orange-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-gradient-to-br from-orange-400/10 to-red-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-2xl mx-auto text-center relative z-10">
        {/* Error Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full blur-xl"></div>
            <div className="relative bg-white rounded-full p-6 shadow-lg border border-red-100">
              <AlertTriangle className="w-16 h-16 text-red-500" />
            </div>
          </div>
        </div>

        {/* Error Content */}
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
          Oops! Something went wrong
        </h1>
        <p className="text-xl text-slate-600 mb-8 max-w-lg mx-auto leading-relaxed">
          We encountered an unexpected error. Don&apos;t worry, our team has
          been notified and we&apos;re working on it.
        </p>

        {/* Error Details */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-sm mb-8 text-left">
          <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
            <Zap className="w-4 h-4 text-red-500" />
            What happened?
          </h3>
          <p className="text-slate-600 text-sm mb-4">
            The application encountered an unexpected error while processing
            your request. This could be due to a temporary server issue or a bug
            in our code.
          </p>
          <div className="bg-slate-50 rounded-lg p-3">
            <code className="text-sm text-slate-700 font-mono">
              Error ID: {error.digest ?? "unavailable"}
            </code>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw
              className={`w-5 h-5 ${
                isRefreshing ? "animate-spin" : "group-hover:rotate-180"
              } transition-transform duration-500`}
            />
            {isRefreshing ? "Refreshing..." : "Try Again"}
          </button>

          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm text-slate-700 rounded-xl font-semibold border border-slate-200 hover:bg-white hover:shadow-lg transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>

          <button
            onClick={handleGoHome}
            className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-all duration-300"
          >
            <Home className="w-5 h-5" />
            Home
          </button>
        </div>

        {/* Help Section */}
        <div className="bg-gradient-to-r from-slate-50 to-white rounded-2xl p-6 border border-slate-200">
          <h3 className="font-semibold text-slate-900 mb-3 flex items-center justify-center gap-2">
            <MessageCircle className="w-4 h-4" />
            Need Help?
          </h3>
          <p className="text-slate-600 text-sm mb-4">
            If this problem persists, please contact our support team with the
            error ID above.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:support@desishub.com"
              className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Email Support
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="hidden sm:block text-slate-300">•</span>
            <a
              href="/help"
              className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Help Center
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
