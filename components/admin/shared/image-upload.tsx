"use client";

import { useRef, useState } from "react";
import { UploadCloud, X, Expand, Loader2, ImageIcon } from "lucide-react";
import { useUploadImage } from "@/content-manager/hooks/useUploadImage";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  className?: string;
}

export function ImageUpload({ value, onChange, label = "Image", className }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const { mutate: upload, isPending, error } = useUploadImage();

  const handleFile = (file: File) => {
    upload(file, { onSuccess: (url) => onChange(url) });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const filename = value ? value.split("/").pop() : null;

  return (
    <div className={cn("flex flex-col gap-1 w-full", className)}>
      <span className="text-xs text-muted-foreground">{label}</span>

      {value ? (
        /* ── Has image ── */
        <div className="flex items-center gap-2 h-10 w-full rounded-md border border-input bg-background px-2">
          {/* Thumbnail */}
          <div className="shrink-0 w-7 h-7 rounded overflow-hidden border border-border bg-muted">
            <img src={value} alt={label} className="w-full h-full object-cover" />
          </div>

          {/* Filename */}
          <span className="flex-1 text-xs text-foreground truncate min-w-0">{filename}</span>

          {/* Expand */}
          <button
            type="button"
            onClick={() => setLightbox(true)}
            className="shrink-0 p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            title="Preview"
          >
            <Expand size={13} />
          </button>

          {/* Replace */}
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={isPending}
            className="shrink-0 text-[11px] font-semibold text-primary hover:underline disabled:opacity-50"
          >
            {isPending ? <Loader2 size={12} className="animate-spin" /> : "Replace"}
          </button>

          {/* Remove */}
          <button
            type="button"
            onClick={() => onChange("")}
            className="shrink-0 p-1 rounded hover:bg-muted text-muted-foreground hover:text-destructive transition-colors"
            title="Remove"
          >
            <X size={13} />
          </button>
        </div>
      ) : (
        /* ── No image — drop zone ── */
        <div
          className={cn(
            "relative flex flex-col items-center justify-center gap-1.5 w-full rounded-md border-2 border-dashed transition-colors cursor-pointer py-4",
            dragging
              ? "border-primary bg-primary/5"
              : "border-input hover:border-primary/50 hover:bg-muted/40",
            isPending && "opacity-60 pointer-events-none"
          )}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          {isPending ? (
            <Loader2 size={20} className="animate-spin text-muted-foreground" />
          ) : (
            <UploadCloud size={20} className="text-muted-foreground" />
          )}
          <p className="text-xs text-muted-foreground text-center">
            {isPending ? "Uploading…" : (
              <><span className="font-medium text-foreground">Click to upload</span> or drag & drop</>
            )}
          </p>
          <p className="text-[10px] text-muted-foreground">PNG, JPG, WebP, GIF, SVG · max 5 MB</p>
        </div>
      )}

      {/* Validation error from API */}
      {error && (
        <p className="text-destructive text-xs">{error.message}</p>
      )}

      {/* Lightbox */}
      {lightbox && value && (
        <div
          className="fixed inset-0 z-[100] bg-black/75 flex items-center justify-center"
          onClick={() => setLightbox(false)}
        >
          <div
            className="relative max-w-2xl max-h-[85vh] rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={value} alt={label} className="max-w-full max-h-[85vh] object-contain" />
            <button
              type="button"
              onClick={() => setLightbox(false)}
              className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-full text-white hover:bg-black/90 transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp,image/gif,image/svg+xml"
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
      />
    </div>
  );
}
