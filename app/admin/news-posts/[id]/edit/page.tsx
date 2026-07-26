"use client";

import { use } from "react";
import { useNewsPost } from "@/content-manager/hooks/useNewsPosts";
import { NewsPostEditor } from "@/components/admin/news-posts/news-post-editor";

export default function EditNewsPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: post, isLoading } = useNewsPost(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-muted-foreground text-sm">Loading post...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-muted-foreground text-sm">Post not found.</div>
      </div>
    );
  }

  return (
    <NewsPostEditor
      mode="edit"
      postId={id}
      defaultValues={{
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        image: post.image,
        publishedAt: new Date(post.publishedAt),
        order: post.order,
        isActive: post.isActive,
      }}
    />
  );
}
