import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { newsPostService } from "@/content-manager/services/news-post.service";

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [post, allPosts] = await Promise.all([
    newsPostService.getById(id).catch(() => null),
    newsPostService.getActive(),
  ]);

  if (!post) notFound();

  const wordCount = post.content?.trim().split(/\s+/).filter(Boolean).length ?? 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));
  const related = allPosts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <main className="min-h-screen bg-white">
      {post.image && (
        <div className="relative h-[420px] w-full">
          <Image src={post.image} alt={post.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-20 pb-12">
            <div className="max-w-3xl">
              <Link href="/news" className="inline-flex items-center gap-1.5 text-white/80 hover:text-white text-sm mb-4 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to News
              </Link>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">{post.title}</h1>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto px-6 py-12">
        {!post.image && (
          <>
            <Link href="/news" className="inline-flex items-center gap-1.5 text-[#6EBE45] hover:underline text-sm mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to News
            </Link>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-6">{post.title}</h1>
          </>
        )}

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-6 mb-8 pb-8 border-b">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-[#6EBE45]" />
            {format(new Date(post.publishedAt), "dd MMMM yyyy")}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#6EBE45]" />
            {readingTime} min read
          </span>
        </div>

        {post.excerpt && (
          <p className="text-lg text-gray-600 leading-relaxed mb-8 font-medium border-l-4 border-[#6EBE45] pl-4">
            {post.excerpt}
          </p>
        )}

        <div
          className="prose prose-sm md:prose-base max-w-none text-gray-700 leading-relaxed
            prose-headings:font-bold prose-headings:text-gray-900
            prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-3
            prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-2
            prose-p:my-3
            prose-ul:list-disc prose-ul:pl-6 prose-ul:my-3
            prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-3
            prose-li:my-1
            prose-blockquote:border-l-4 prose-blockquote:border-[#6EBE45] prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-500
            prose-a:text-[#6EBE45] prose-a:underline
            prose-strong:font-bold
            prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
            prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-lg prose-pre:p-4 prose-pre:overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-12 pt-8 border-t">
          <Link href="/news" className="inline-flex items-center gap-2 text-[#6EBE45] font-semibold hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to all news
          </Link>
        </div>
      </div>

      {related.length > 0 && (
        <div className="bg-gray-50 border-t py-16">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-xl font-bold text-gray-900 mb-8">More News</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link key={p.id} href={`/news/${p.id}`} className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
                  {p.image && (
                    <div className="relative h-40 w-full">
                      <Image src={p.image} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                  )}
                  <div className="p-4">
                    <p className="text-xs text-[#6EBE45] font-semibold mb-1">{format(new Date(p.publishedAt), "dd MMM yyyy")}</p>
                    <h3 className="text-sm font-bold text-gray-900 line-clamp-2 group-hover:text-[#6EBE45] transition-colors">{p.title}</h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{p.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
