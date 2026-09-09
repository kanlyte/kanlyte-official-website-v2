import { Footer } from "@/components/home/footer";
import { Navbar } from "@/components/home/navigation";
import type React from "react";

// Deploys are built locally (no DB reachable from the build machine) then
// uploaded as a static tarball, so pages under this layout can't be
// prerendered at build time -- see lib/cached.ts for the runtime-only
// caching layer that keeps DB load down instead.
export const dynamic = "force-dynamic";

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
