"use client";

import { Search, Home, CreditCard, Star, MapPin, Shield, Bell, Camera, MessageCircle, Filter, Heart, Smartphone } from "lucide-react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const features = [
  { name: "Smart Search", icon: Search },
  { name: "Verified Listings", icon: Shield },
  { name: "Map View", icon: MapPin },
  { name: "Instant Booking", icon: Home },
  { name: "Secure Payments", icon: CreditCard },
  { name: "Reviews & Ratings", icon: Star },
  { name: "Photo Galleries", icon: Camera },
  { name: "Direct Messaging", icon: MessageCircle },
  { name: "Advanced Filters", icon: Filter },
  { name: "Saved Favourites", icon: Heart },
  { name: "Push Notifications", icon: Bell },
  { name: "Mobile First", icon: Smartphone },
];

export function LyteFeatures() {
  return (
    <section className="bg-[#F8F9FA] py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#212529] mb-4">Everything You Need to Find a Home</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Lyte packs everything into one seamless app — for tenants and property owners alike.</p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-12 gap-x-8 mb-20">
          {features.map((f) => (
            <div key={f.name} className="flex flex-col items-center group cursor-pointer">
              <div className="w-20 h-20 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-200 group-hover:bg-[#6EBE45]">
                <f.icon className="w-9 h-9 text-[#6EBE45] group-hover:text-white transition-colors" />
              </div>
              <span className="text-[#212529] font-semibold text-sm text-center">{f.name}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-gray-200">
          <div className="flex items-center gap-4 mb-6 md:mb-0">
            <span className="text-[#714B67] font-semibold text-lg italic">Imagine house hunting without Lyte</span>
          </div>
          <Link href="/contact-us" className="flex items-center text-[#007A7E] font-bold text-xl hover:underline group">
            Get Early Access <ArrowRight className="ml-2 w-6 h-6 transition-transform group-hover:translate-x-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
