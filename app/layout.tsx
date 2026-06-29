import { QueryProvider } from "@/providers/ReactQueryClient";
import type React from "react";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Toaster } from "sonner";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Kanlyte Uganda Limited - Web Hosting, App Development & Tech Solutions",
  description:
    "Professional tech services provider in Uganda. Web hosting, systems development, email hosting, app development, coding classes, and innovative solutions like School Sync and Odoo systems.",
  generator: "v0.app",
  keywords: [
    "web hosting",
    "app development",
    "systems development",
    "email hosting",
    "coding classes",
    "Uganda tech",
    "Odoo customizations",
    "School Sync",
    "E-Commerce",
  ],
  icons: {
    icon: [
      { url: "/logos/logo-transparent.png", type: "image/png" },
      { url: "/logos/logo-transparent.png", sizes: "32x32", type: "image/png" },
      { url: "/logos/logo-transparent.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/logos/logo-transparent.png",
    shortcut: "/logos/logo-transparent.png",
  },
  openGraph: {
    title: "Kanlyte Uganda Limited - Tech Solutions",
    description:
      "Leading tech services provider offering web hosting, app development, systems development, and innovative business solutions.",
    url: "https://kanlyte.ug",
    siteName: "Kanlyte Uganda Limited",
    images: [
      {
        url: "/logos/logo-transparent.png",
        width: 512,
        height: 512,
        alt: "Kanlyte Uganda Limited",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Kanlyte Uganda Limited",
    description: "Leading tech services provider in Uganda.",
    images: ["/logos/logo-transparent.png"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        {/* <Header /> */}
        <Toaster richColors />
        <QueryProvider>
          {children}
          <Analytics />
        </QueryProvider>
      </body>
    </html>
  );
}
