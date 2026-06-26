"use client";

import { useMutation } from "@tanstack/react-query";

async function uploadFile(file: File): Promise<string> {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch("/api/upload", { method: "POST", body: form });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error ?? "Upload failed");
  return json.url as string;
}

export function useUploadImage() {
  return useMutation({ mutationFn: uploadFile });
}
