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
import { Switch } from "@/components/ui/switch";
import { useModalStore } from "@/store/modal.store";
import { useCreateGalleryImage, useUpdateGalleryImage } from "@/content-manager/hooks/useGalleryImages";
import { ImageUpload } from "@/components/admin/shared/image-upload";
import { CreateGalleryImageSchema } from "@/content-manager/dtos/gallery-image.dto";
import type { CreateGalleryImageInput } from "@/content-manager/dtos/gallery-image.dto";

const RESOURCE = "gallery-images";

export function GalleryImageModal() {
  const { type, resource, record, close } = useModalStore();
  const isCreate = type === "create" && resource === RESOURCE;
  const isEdit = type === "edit" && resource === RESOURCE;
  const isOpen = isCreate || isEdit;

  const { mutate: create, isPending: creating } = useCreateGalleryImage();
  const { mutate: update, isPending: updating } = useUpdateGalleryImage();
  const isPending = creating || updating;

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<CreateGalleryImageInput>({
    resolver: zodResolver(CreateGalleryImageSchema),
    defaultValues: { title: "", image: "", category: "", order: 0, isActive: true },
  });

  const isActive = watch("isActive");

  useEffect(() => {
    if (isEdit && record) {
      reset({
        title: record.title as string,
        image: record.image as string,
        category: (record.category as string) ?? "",
        order: record.order as number,
        isActive: record.isActive as boolean,
      });
    } else if (isCreate) {
      reset({ title: "", image: "", category: "", order: 0, isActive: true });
    }
  }, [isEdit, isCreate, record, reset]);

  function onSubmit(data: CreateGalleryImageInput) {
    if (isEdit) {
      update({ id: record?.id as string, data }, { onSuccess: close });
    } else {
      create(data, { onSuccess: close });
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="sm:max-w-[560px] p-0 gap-0">
        <DialogHeader className="px-6 pt-5 pb-3 border-b">
          <DialogTitle className="text-base">{isEdit ? "Edit Gallery Image" : "Add Gallery Image"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 py-4 space-y-3">
            <div className="grid grid-cols-2 gap-x-4">
              <div className="space-y-1">
                <Label htmlFor="title" className="text-xs">Title</Label>
                <Input id="title" placeholder="e.g. Team Retreat 2026" className="h-8 text-sm" {...register("title")} />
                {errors.title && <p className="text-destructive text-xs">{errors.title.message}</p>}
              </div>
              <div className="space-y-1">
                <Label htmlFor="category" className="text-xs">Category (optional)</Label>
                <Input id="category" placeholder="e.g. Events" className="h-8 text-sm" {...register("category")} />
              </div>
            </div>

            <ImageUpload
              label="Image"
              value={watch("image")}
              onChange={(url) => setValue("image", url, { shouldValidate: true })}
            />
            {errors.image && <p className="text-destructive text-xs">{errors.image.message}</p>}

            <div className="grid grid-cols-2 gap-x-4">
              <div className="space-y-1">
                <Label htmlFor="order" className="text-xs">Order</Label>
                <Input id="order" type="number" className="h-8 text-sm" {...register("order", { valueAsNumber: true })} />
                {errors.order && <p className="text-destructive text-xs">{errors.order.message}</p>}
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
