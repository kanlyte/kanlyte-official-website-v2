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
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Kanlyte Uganda Limited - Tech Solutions",
    description:
      "Leading tech services provider offering web hosting, app development, systems development, and innovative business solutions.",
    url: "https://kanlyte.ug",
    type: "website",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
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
