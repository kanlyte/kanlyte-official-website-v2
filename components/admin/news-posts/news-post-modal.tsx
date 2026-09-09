"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useModalStore } from "@/store/modal.store";
import { useCreateNewsPost, useUpdateNewsPost } from "@/content-manager/hooks/useNewsPosts";
import { ImageUpload } from "@/components/admin/shared/image-upload";
import { CreateNewsPostSchema } from "@/content-manager/dtos/news-post.dto";
import type { CreateNewsPostInput } from "@/content-manager/dtos/news-post.dto";
import { format } from "date-fns";

const RESOURCE = "news-posts";

function toDateInputValue(value: unknown) {
  if (!value) return format(new Date(), "yyyy-MM-dd");
  return format(new Date(value as string | Date), "yyyy-MM-dd");
}

export function NewsPostModal() {
  const { type, resource, record, close } = useModalStore();
  const isCreate = type === "create" && resource === RESOURCE;
  const isEdit = type === "edit" && resource === RESOURCE;
  const isOpen = isCreate || isEdit;

  const { mutate: create, isPending: creating } = useCreateNewsPost();
  const { mutate: update, isPending: updating } = useUpdateNewsPost();
  const isPending = creating || updating;

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<CreateNewsPostInput>({
    resolver: zodResolver(CreateNewsPostSchema),
    defaultValues: { title: "", excerpt: "", content: "", image: "", publishedAt: new Date(), order: 0, isActive: true },
  });

  const isActive = watch("isActive");

  useEffect(() => {
    if (isEdit && record) {
      reset({
        title: record.title as string,
        excerpt: record.excerpt as string,
        content: record.content as string,
        image: record.image as string,
        publishedAt: new Date(record.publishedAt as string),
        order: record.order as number,
        isActive: record.isActive as boolean,
      });
    } else if (isCreate) {
      reset({ title: "", excerpt: "", content: "", image: "", publishedAt: new Date(), order: 0, isActive: true });
    }
  }, [isEdit, isCreate, record, reset]);

  function onSubmit(data: CreateNewsPostInput) {
    if (isEdit) {
      update({ id: record?.id as string, data }, { onSuccess: close });
    } else {
      create(data, { onSuccess: close });
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="sm:max-w-[620px] p-0 gap-0">
        <DialogHeader className="px-6 pt-5 pb-3 border-b">
          <DialogTitle className="text-base">{isEdit ? "Edit News Post" : "Add News Post"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 py-4 space-y-3">
            <div className="grid grid-cols-2 gap-x-4">
              <div className="space-y-1">
                <Label htmlFor="title" className="text-xs">Title</Label>
                <Input id="title" placeholder="News headline" className="h-8 text-sm" {...register("title")} />
                {errors.title && <p className="text-destructive text-xs">{errors.title.message}</p>}
              </div>
              <div className="space-y-1">
                <Label htmlFor="order" className="text-xs">Order</Label>
                <Input id="order" type="number" className="h-8 text-sm" {...register("order", { valueAsNumber: true })} />
                {errors.order && <p className="text-destructive text-xs">{errors.order.message}</p>}
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="excerpt" className="text-xs">Excerpt</Label>
              <Textarea id="excerpt" placeholder="Short summary shown on cards..." className="text-sm resize-none h-16" {...register("excerpt")} />
              {errors.excerpt && <p className="text-destructive text-xs">{errors.excerpt.message}</p>}
            </div>

            <div className="space-y-1">
              <Label htmlFor="content" className="text-xs">Content</Label>
              <Textarea id="content" placeholder="Full article content..." className="text-sm resize-none h-28" {...register("content")} />
              {errors.content && <p className="text-destructive text-xs">{errors.content.message}</p>}
            </div>

            <ImageUpload
              label="Cover Image"
              value={watch("image")}
              onChange={(url) => setValue("image", url, { shouldValidate: true })}
            />
            {errors.image && <p className="text-destructive text-xs">{errors.image.message}</p>}

            <div className="grid grid-cols-2 gap-x-4">
              <div className="space-y-1">
                <Label htmlFor="publishedAt" className="text-xs">Published Date</Label>
                <Input
                  id="publishedAt"
                  type="date"
                  className="h-8 text-sm"
                  value={toDateInputValue(watch("publishedAt"))}
                  onChange={(e) => setValue("publishedAt", e.target.value ? new Date(e.target.value) : new Date(), { shouldValidate: true })}
                />
                {errors.publishedAt && <p className="text-destructive text-xs">{errors.publishedAt.message}</p>}
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Status</Label>
                <div className="flex items-center gap-2 h-8">
                  <Switch id="isActive" checked={isActive} onCheckedChange={(v) => setValue("isActive", v)} />
                  <span className="text-sm text-muted-foreground">{isActive ? "Active" : "Inactive"}</span>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="px-6 py-3 border-t">
            <Button type="button" variant="outline" size="sm" onClick={close} disabled={isPending}>Cancel</Button>
            <Button type="submit" size="sm" disabled={isPending}>
              {isPending ? "Saving..." : isEdit ? "Save Changes" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
