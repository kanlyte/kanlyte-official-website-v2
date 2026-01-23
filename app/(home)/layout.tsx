import { Footer } from "@/components/home/footer";
import { Navbar } from "@/components/home/navigation";
import type React from "react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-brand-primary selection:text-white">
        <Navbar />

        {children}
        <Footer />
      </div>
    </div>
  );
}
