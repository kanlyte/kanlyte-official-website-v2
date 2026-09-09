"use client";

import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Hero } from "@/components/about-us/hero";
import { useNewsPosts } from "@/content-manager/hooks/useNewsPosts";

export default function NewsPage() {
  const { data: news = [], isLoading } = useNewsPosts(true);

  return (
    <main className="min-h-screen bg-white">
      <Hero
        backgroundImage="/images/office.jpeg"
        backgroundAlt="News & Updates"
        title="News & Updates"
        highlightedTitle="Updates"
        tagline="Resources"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "News", isActive: true },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 py-20">
        {isLoading ? (
          <p className="text-center text-muted-foreground">Loading news...</p>
        ) : news.length === 0 ? (
          <p className="text-center text-muted-foreground">No news posts yet. Check back soon.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((post: { id: string; title: string; excerpt: string; content: string; image: string; publishedAt: string }) => (
              <Link key={post.id} href={`/news/${post.id}`} className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold text-[#6EBE45] uppercase tracking-wider mb-2">
                    {format(new Date(post.publishedAt), "dd MMM yyyy")}
                  </p>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#6EBE45] transition-colors">{post.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
