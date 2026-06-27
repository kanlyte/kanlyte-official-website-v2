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
import { useCreateSocialLink, useUpdateSocialLink } from "@/content-manager/hooks/useSocialLinks";
import { CreateSocialLinkSchema } from "@/content-manager/dtos/social-link.dto";
import type { CreateSocialLinkInput } from "@/content-manager/dtos/social-link.dto";

const RESOURCE = "social-links";

const PLATFORMS = [
  { label: "Facebook", icon: "Facebook", color: "#1877F2" },
  { label: "Twitter / X", icon: "X", color: "#000000" },
  { label: "LinkedIn", icon: "Linkedin", color: "#0A66C2" },
  { label: "YouTube", icon: "Youtube", color: "#FF0000" },
  { label: "Instagram", icon: "Instagram", color: "#E1306C" },
  { label: "TikTok", icon: "Music", color: "#010101" },
  { label: "GitHub", icon: "Github", color: "#24292E" },
  { label: "WhatsApp", icon: "MessageCircle", color: "#25D366" },
];

export function SocialLinkModal() {
  const { type, resource, record, close } = useModalStore();
  const isCreate = type === "create" && resource === RESOURCE;
  const isEdit = type === "edit" && resource === RESOURCE;
  const isOpen = isCreate || isEdit;

  const { mutate: create, isPending: creating, error: createError } = useCreateSocialLink();
  const { mutate: update, isPending: updating, error: updateError } = useUpdateSocialLink();
  const isPending = creating || updating;
  const apiError = createError || updateError;

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<CreateSocialLinkInput>({
    resolver: zodResolver(CreateSocialLinkSchema),
    defaultValues: { platform: "", icon: "", url: "", color: "#000000", order: 0, isActive: true },
  });

  const isActive = watch("isActive");
  const color = watch("color");

  useEffect(() => {
    if (isEdit && record) {
      reset({
        platform: record.platform as string,
        icon: record.icon as string,
        url: record.url as string,
        color: record.color as string,
        order: record.order as number,
        isActive: record.isActive as boolean,
      });
    } else if (isCreate) {
      reset({ platform: "", icon: "", url: "", color: "#000000", order: 0, isActive: true });
    }
  }, [isEdit, isCreate, record, reset]);

  function onSubmit(data: CreateSocialLinkInput) {
    if (isEdit) {
      update({ id: record?.id as string, data }, { onSuccess: close });
    } else {
      create(data, { onSuccess: close });
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="sm:max-w-[520px] p-0 gap-0">
        <DialogHeader className="px-6 pt-5 pb-3 border-b">
          <DialogTitle className="text-base">{isEdit ? "Edit Social Link" : "Add Social Link"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 py-4 space-y-3">
            {/* Quick platform presets */}
            <div className="space-y-1.5">
              <Label className="text-xs">Quick Select Platform</Label>
              <div className="flex flex-wrap gap-1.5">
                {PLATFORMS.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => { setValue("platform", p.label); setValue("icon", p.icon); setValue("color", p.color); }}
                    className="px-2.5 py-1 rounded text-xs font-medium text-white transition-opacity hover:opacity-80"
                    style={{ backgroundColor: p.color }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4">
              <div className="space-y-1">
                <Label htmlFor="platform" className="text-xs">Platform Name</Label>
                <Input id="platform" placeholder="Facebook" className="h-8 text-sm" {...register("platform")} />
                {errors.platform && <p className="text-destructive text-xs">{errors.platform.message}</p>}
              </div>
              <div className="space-y-1">
                <Label htmlFor="order" className="text-xs">Order</Label>
                <Input id="order" type="number" className="h-8 text-sm" {...register("order", { valueAsNumber: true })} />
                {errors.order && <p className="text-destructive text-xs">{errors.order.message}</p>}
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="url" className="text-xs">URL</Label>
              <Input id="url" placeholder="https://facebook.com/yourpage" className="h-8 text-sm" {...register("url")} />
              {errors.url && <p className="text-destructive text-xs">{errors.url.message}</p>}
            </div>

            <div className="space-y-1">
              <Label htmlFor="color" className="text-xs">Brand Color</Label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  id="color"
                  value={color}
                  onChange={(e) => setValue("color", e.target.value)}
                  className="h-8 w-10 rounded border border-input cursor-pointer p-0.5"
                />
                <Input value={color} onChange={(e) => setValue("color", e.target.value)} className="h-8 text-sm font-mono" placeholder="#1877F2" />
              </div>
              {errors.color && <p className="text-destructive text-xs">{errors.color.message}</p>}
            </div>

            <div className="space-y-1">
              <Label className="text-xs">Status</Label>
              <div className="flex items-center gap-2 h-8">
                <Switch id="isActive" checked={isActive} onCheckedChange={(v) => setValue("isActive", v)} />
                <span className="text-sm text-muted-foreground">{isActive ? "Active" : "Inactive"}</span>
              </div>
            </div>
          </div>

          <DialogFooter className="px-6 py-3 border-t">
            {apiError && <p className="text-destructive text-xs mr-auto">{apiError.message}</p>}
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
