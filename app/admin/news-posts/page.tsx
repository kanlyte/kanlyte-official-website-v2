"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { DeleteModal } from "@/components/admin/resources/delete-modal";
import { useNewsPosts, useDeleteNewsPost } from "@/content-manager/hooks/useNewsPosts";
import { useModalStore } from "@/store/modal.store";
import { useTableStore } from "@/store/table.store";
import { format } from "date-fns";
import { Plus, Pencil, Trash2, Search, Newspaper } from "lucide-react";

export default function NewsPostsPage() {
  const router = useRouter();
  const { data = [], isLoading } = useNewsPosts();
  const { mutate: deletePost, isPending } = useDeleteNewsPost();
  const { open } = useModalStore();
  const { search, setSearch } = useTableStore();

  const filtered = data.filter((p: { title: string; excerpt: string }) =>
    [p.title, p.excerpt].some((v) => v?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-xl">News & Updates</h1>
          <p className="text-muted-foreground text-sm">Manage news posts shown on the website.</p>
        </div>
        <Link href="/admin/news-posts/new">
          <Button size="sm" className="gap-1.5 bg-[#6EBE45] hover:bg-[#5aA835] text-white">
            <Plus className="w-4 h-4" /> New Post
          </Button>
        </Link>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="pt-4 space-y-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
            <Input
              placeholder="Search news posts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">#</TableHead>
                  <TableHead className="w-16">Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Excerpt</TableHead>
                  <TableHead>Published</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-24 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      {Array.from({ length: 7 }).map((_, j) => (
                        <TableCell key={j}><Skeleton className="h-4 w-20" /></TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="py-16 text-center">
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <Newspaper className="w-8 h-8 opacity-30" />
                        <p className="text-sm">No posts found</p>
                        <Link href="/admin/news-posts/new">
                          <Button size="sm" variant="outline" className="mt-1">Write your first post</Button>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((post: { id: string; order: number; image: string; title: string; excerpt: string; publishedAt: string; isActive: boolean }) => (
                    <TableRow key={post.id} className="group">
                      <TableCell className="text-xs text-muted-foreground">#{post.order}</TableCell>
                      <TableCell>
                        {post.image
                          ? <img src={post.image} alt="" className="h-9 w-14 object-cover rounded" />
                          : <div className="h-9 w-14 rounded bg-muted flex items-center justify-center"><Newspaper className="w-4 h-4 text-muted-foreground/40" /></div>
                        }
                      </TableCell>
                      <TableCell>
                        <span className="font-medium text-sm line-clamp-1 max-w-[200px]">{post.title}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs text-muted-foreground line-clamp-1 max-w-[220px]">{post.excerpt || "—"}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs text-muted-foreground">{format(new Date(post.publishedAt), "dd MMM yyyy")}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={post.isActive ? "default" : "secondary"} className={post.isActive ? "bg-[#6EBE45] text-white text-xs" : "text-xs"}>
                          {post.isActive ? "Active" : "Draft"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost" size="icon" className="size-7"
                            onClick={() => router.push(`/admin/news-posts/${post.id}/edit`)}
                          >
                            <Pencil className="size-3.5" />
                          </Button>
                          <Button
                            variant="ghost" size="icon" className="size-7 text-destructive hover:text-destructive"
                            onClick={() => open("delete", "news-posts", post)}
                          >
                            <Trash2 className="size-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {!isLoading && filtered.length > 0 && (
            <p className="text-muted-foreground text-xs">{filtered.length} post{filtered.length !== 1 ? "s" : ""}</p>
          )}
        </CardContent>
      </Card>

      <DeleteModal resource="news-posts" onConfirm={deletePost} isPending={isPending} />
    </div>
  );
}
