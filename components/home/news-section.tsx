"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { useNewsPosts } from "@/content-manager/hooks/useNewsPosts";

const FALLBACK_NEWS = [
  {
    id: "1",
    title: "Kanlyte Launches School Sync Across Uganda",
    excerpt: "Our school management platform is now helping institutions streamline records, fees, and academics nationwide.",
    image: "/images/about-04.jpg",
    publishedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Partnering With Local Communities on Digital Skills",
    excerpt: "We're expanding our ICT training programs to reach more communities and financial institutions across the region.",
    image: "/images/about-05.jpg",
    publishedAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Kanlyte Joins Research & Innovation Forum",
    excerpt: "Our team showcased AI and IoT-driven solutions built for education, government, and NGO partners.",
    image: "/images/office.jpeg",
    publishedAt: new Date().toISOString(),
  },
];

export function NewsSection() {
  const { data: dbNews } = useNewsPosts(true);
  const news = dbNews?.length ? dbNews : FALLBACK_NEWS;

  return (
    <section className="py-24 bg-gray-50 border-y border-gray-100">
      <div className="mx-8 md:mx-14 lg:mx-20 xl:mx-28 2xl:mx-auto 2xl:max-w-6xl">
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="inline-block rounded-full bg-green-100 px-4 py-1 text-sm font-bold text-green-600 mb-4">
              Resources
            </div>
            <h2 className="text-3xl font-black tracking-tight text-gray-900">
              News & Updates
            </h2>
          </div>
          <Link
            href="/news"
            className="hidden sm:inline-flex items-center gap-2 text-[#6EBE45] font-semibold hover:gap-3 transition-all"
          >
            View All News
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.slice(0, 3).map((post: { id: string; title: string; excerpt: string; image: string; publishedAt: string }) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 w-full">
                <Image src={post.image} alt={post.title} fill className="object-cover" />
              </div>
              <div className="p-6">
                <p className="text-xs font-semibold text-[#6EBE45] uppercase tracking-wider mb-2">
                  {format(new Date(post.publishedAt), "dd MMM yyyy")}
                </p>
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">{post.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
