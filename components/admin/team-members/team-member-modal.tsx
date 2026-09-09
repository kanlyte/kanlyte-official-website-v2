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
import { useCreateTeamMember, useUpdateTeamMember } from "@/content-manager/hooks/useTeamMembers";
import { CreateTeamMemberSchema } from "@/content-manager/dtos/team-member.dto";
import type { CreateTeamMemberInput } from "@/content-manager/dtos/team-member.dto";
import { ImageUpload } from "@/components/admin/shared/image-upload";

const RESOURCE = "team-members";

export function TeamMemberModal() {
  const { type, resource, record, close } = useModalStore();
  const isCreate = type === "create" && resource === RESOURCE;
  const isEdit = type === "edit" && resource === RESOURCE;
  const isOpen = isCreate || isEdit;

  const { mutate: create, isPending: creating, error: createError } = useCreateTeamMember();
  const { mutate: update, isPending: updating, error: updateError } = useUpdateTeamMember();
  const isPending = creating || updating;
  const apiError = createError || updateError;

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<CreateTeamMemberInput>({
    resolver: zodResolver(CreateTeamMemberSchema),
    defaultValues: { name: "", role: "", image: "", featured: false, order: 0, isActive: true, social: {} },
  });

  const isActive = watch("isActive");
  const featured = watch("featured");

  useEffect(() => {
    if (isEdit && record) {
      reset({
        name: record.name as string,
        role: record.role as string,
        image: record.image as string,
        featured: record.featured as boolean,
        order: record.order as number,
        isActive: record.isActive as boolean,
        social: record.social ? {
          instagram: (record.social as Record<string, string | null>).instagram ?? undefined,
          twitter: (record.social as Record<string, string | null>).twitter ?? undefined,
          linkedin: (record.social as Record<string, string | null>).linkedin ?? undefined,
          github: (record.social as Record<string, string | null>).github ?? undefined,
          tiktok: (record.social as Record<string, string | null>).tiktok ?? undefined,
        } : {},
      });
    } else if (isCreate) {
      reset({ name: "", role: "", image: "", featured: false, order: 0, isActive: true, social: {} });
    }
  }, [isEdit, isCreate, record, reset]);

  function onSubmit(data: CreateTeamMemberInput) {
    if (isEdit) {
      update({ id: record?.id as string, data }, { onSuccess: close });
    } else {
      create(data, { onSuccess: close });
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="sm:max-w-[620px] p-0 gap-0 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="px-6 pt-5 pb-3 border-b">
          <DialogTitle className="text-base">{isEdit ? "Edit Team Member" : "Add Team Member"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 py-4 space-y-3">
            <div className="grid grid-cols-2 gap-x-4">
              <div className="space-y-1">
                <Label htmlFor="name" className="text-xs">Name</Label>
                <Input id="name" placeholder="John Doe" className="h-8 text-sm" {...register("name")} />
                {errors.name && <p className="text-destructive text-xs">{errors.name.message}</p>}
              </div>
              <div className="space-y-1">
                <Label htmlFor="role" className="text-xs">Role</Label>
                <Input id="role" placeholder="Software Engineer" className="h-8 text-sm" {...register("role")} />
                {errors.role && <p className="text-destructive text-xs">{errors.role.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4">
              <div className="space-y-1">
                <Label htmlFor="order" className="text-xs">Order</Label>
                <Input id="order" type="number" className="h-8 text-sm" {...register("order", { valueAsNumber: true })} />
                {errors.order && <p className="text-destructive text-xs">{errors.order.message}</p>}
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Options</Label>
                <div className="flex items-center gap-4 h-8">
                  <div className="flex items-center gap-2">
                    <Switch id="isActive" checked={isActive} onCheckedChange={(v) => setValue("isActive", v)} />
                    <span className="text-xs text-muted-foreground">{isActive ? "Active" : "Inactive"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="featured" checked={featured} onCheckedChange={(v) => setValue("featured", v)} />
                    <span className="text-xs text-muted-foreground">{featured ? "Featured" : "Not Featured"}</span>
                  </div>
                </div>
              </div>
            </div>

            <ImageUpload
              label="Profile Image"
              value={watch("image")}
              onChange={(url) => setValue("image", url, { shouldValidate: true })}
            />
            {errors.image && <p className="text-destructive text-xs">{errors.image.message}</p>}

            {/* Social Links */}
            <div className="space-y-2">
              <Label className="text-xs font-medium">Social Links (optional)</Label>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <div className="space-y-1">
                  <Label htmlFor="social.linkedin" className="text-[11px] text-muted-foreground">LinkedIn</Label>
                  <Input id="social.linkedin" placeholder="https://linkedin.com/in/..." className="h-7 text-xs" {...register("social.linkedin")} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="social.twitter" className="text-[11px] text-muted-foreground">Twitter / X</Label>
                  <Input id="social.twitter" placeholder="https://x.com/..." className="h-7 text-xs" {...register("social.twitter")} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="social.instagram" className="text-[11px] text-muted-foreground">Instagram</Label>
                  <Input id="social.instagram" placeholder="https://instagram.com/..." className="h-7 text-xs" {...register("social.instagram")} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="social.github" className="text-[11px] text-muted-foreground">GitHub</Label>
                  <Input id="social.github" placeholder="https://github.com/..." className="h-7 text-xs" {...register("social.github")} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="social.tiktok" className="text-[11px] text-muted-foreground">TikTok</Label>
                  <Input id="social.tiktok" placeholder="https://tiktok.com/@..." className="h-7 text-xs" {...register("social.tiktok")} />
                </div>
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
