import { QueryProvider } from "@/providers/ReactQueryClient";
import type React from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import "@fontsource-variable/manrope";
import { Toaster } from "sonner";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://kanlyte.com"),
  title: {
    default: "Kanlyte Uganda Limited | Digital Solutions in Uganda",
    template: "%s | Kanlyte Uganda Limited",
  },
  description:
    "Professional tech services provider in Uganda. Web hosting, systems development, email hosting, app development, coding classes, and innovative solutions like School Sync and Odoo systems.",
  applicationName: "Kanlyte Uganda Limited",
  authors: [{ name: "Kanlyte Uganda Limited", url: "https://kanlyte.com" }],
  creator: "Kanlyte Uganda Limited",
  publisher: "Kanlyte Uganda Limited",
  category: "technology",
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
    "website development Uganda",
    "business software Uganda",
    "digital transformation Uganda",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
    other: { rel: "manifest", url: "/site.webmanifest" },
  },
  openGraph: {
    title: "Kanlyte Uganda Limited - Tech Solutions",
    description:
      "Leading tech services provider offering web hosting, app development, systems development, and innovative business solutions.",
    url: "https://kanlyte.com",
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
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-EZH96K0MW5"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-EZH96K0MW5');
          `}
        </Script>
      </head>
      <body className="font-sans">
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
