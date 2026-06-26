"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useModalStore } from "@/store/modal.store";
import { useCreateHeroSlide, useUpdateHeroSlide } from "@/content-manager/hooks/useHeroSlides";
import { ImageUpload } from "@/components/admin/shared/image-upload";
import { CreateHeroSlideSchema } from "@/content-manager/dtos/hero-slide.dto";
import type { CreateHeroSlideInput } from "@/content-manager/dtos/hero-slide.dto";

const RESOURCE = "hero-slides";

export function HeroSlideModal() {
  const { type, resource, record, close } = useModalStore();
  const isCreate = type === "create" && resource === RESOURCE;
  const isEdit = type === "edit" && resource === RESOURCE;
  const isOpen = isCreate || isEdit;

  const { mutate: create, isPending: creating } = useCreateHeroSlide();
  const { mutate: update, isPending: updating } = useUpdateHeroSlide();
  const isPending = creating || updating;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateHeroSlideInput>({
    resolver: zodResolver(CreateHeroSlideSchema),
    defaultValues: {
      order: 0,
      isActive: true,
      image: "",
      title: "",
      subtitle: "",
      description: "",
      buttonText: "",
      buttonLink: "",
    },
  });

  const isActive = watch("isActive");

  useEffect(() => {
    if (isEdit && record) {
      reset({
        order: record.order as number,
        image: record.image as string,
        title: record.title as string,
        subtitle: record.subtitle as string,
        description: record.description as string,
        buttonText: record.buttonText as string,
        buttonLink: record.buttonLink as string,
        isActive: record.isActive as boolean,
      });
    } else if (isCreate) {
      reset({ order: 0, isActive: true, image: "", title: "", subtitle: "", description: "", buttonText: "", buttonLink: "" });
    }
  }, [isEdit, isCreate, record, reset]);

  function onSubmit(data: CreateHeroSlideInput) {
    if (isEdit) {
      update({ id: record?.id as string, data }, { onSuccess: close });
    } else {
      create(data, { onSuccess: close });
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="sm:max-w-[700px] p-0 gap-0">
        <DialogHeader className="px-6 pt-5 pb-3 border-b">
          <DialogTitle className="text-base">
            {isEdit ? "Edit Hero Slide" : "Add Hero Slide"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 py-4 grid grid-cols-2 gap-x-5 gap-y-3">
            {/* Row 1 — Title + Subtitle */}
            <div className="space-y-1">
              <Label htmlFor="title" className="text-xs">Title</Label>
              <Input id="title" placeholder="Empowering" className="h-8 text-sm" {...register("title")} />
              {errors.title && <p className="text-destructive text-xs">{errors.title.message}</p>}
            </div>
            <div className="space-y-1">
              <Label htmlFor="subtitle" className="text-xs">Subtitle</Label>
              <Input id="subtitle" placeholder="Technology in Healthcare" className="h-8 text-sm" {...register("subtitle")} />
              {errors.subtitle && <p className="text-destructive text-xs">{errors.subtitle.message}</p>}
            </div>

            {/* Row 2 — Description full width */}
            <div className="col-span-2 space-y-1">
              <Label htmlFor="description" className="text-xs">Description</Label>
              <Input id="description" placeholder="To Love and Serve" className="h-8 text-sm" {...register("description")} />
              {errors.description && <p className="text-destructive text-xs">{errors.description.message}</p>}
            </div>

            {/* Row 3 — Image upload full width */}
            <div className="col-span-2">
              <ImageUpload
                label="Image"
                value={watch("image")}
                onChange={(url) => setValue("image", url, { shouldValidate: true })}
              />
              {errors.image && <p className="text-destructive text-xs">{errors.image.message}</p>}
            </div>

            {/* Row 4 — Button Text + Button Link */}
            <div className="space-y-1">
              <Label htmlFor="buttonText" className="text-xs">Button Text</Label>
              <Input id="buttonText" placeholder="Learn More" className="h-8 text-sm" {...register("buttonText")} />
              {errors.buttonText && <p className="text-destructive text-xs">{errors.buttonText.message}</p>}
            </div>
            <div className="space-y-1">
              <Label htmlFor="buttonLink" className="text-xs">Button Link</Label>
              <Input id="buttonLink" placeholder="/contact-us" className="h-8 text-sm" {...register("buttonLink")} />
              {errors.buttonLink && <p className="text-destructive text-xs">{errors.buttonLink.message}</p>}
            </div>

            {/* Row 5 — Order + Active */}
            <div className="space-y-1">
              <Label htmlFor="order" className="text-xs">Order</Label>
              <Input id="order" type="number" className="h-8 text-sm" {...register("order", { valueAsNumber: true })} />
              {errors.order && <p className="text-destructive text-xs">{errors.order.message}</p>}
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Status</Label>
              <div className="flex items-center gap-2 h-8">
                <Switch
                  id="isActive"
                  checked={isActive}
                  onCheckedChange={(v) => setValue("isActive", v)}
                />
                <span className="text-sm text-muted-foreground">
                  {isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          </div>

          <DialogFooter className="px-6 py-3 border-t">
            <Button type="button" variant="outline" size="sm" onClick={close} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" size="sm" disabled={isPending}>
              {isPending ? "Saving..." : isEdit ? "Save Changes" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
