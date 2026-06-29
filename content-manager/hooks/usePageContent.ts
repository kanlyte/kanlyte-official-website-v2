"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreatePageContentInput, UpdatePageContentInput } from "../dtos";

const BASE = "/api/page-content";
const KEY = "page-content";

async function fetchJSON(url: string, init?: RequestInit) {
  const res = await fetch(url, init);
  if (!res.ok) throw new Error((await res.json()).error ?? res.statusText);
  return res.json();
}

export function usePageContents() {
  return useQuery({ queryKey: [KEY], queryFn: () => fetchJSON(BASE) });
}

export function usePageContent(slug: string) {
  return useQuery({
    queryKey: [KEY, slug],
    queryFn: () => fetchJSON(`${BASE}?slug=${slug}`),
    enabled: !!slug,
  });
}

export function usePageContentById(id: string) {
  return useQuery({
    queryKey: [KEY, "id", id],
    queryFn: () => fetchJSON(`${BASE}/${id}`),
    enabled: !!id,
  });
}

export function useCreatePageContent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreatePageContentInput) =>
      fetchJSON(BASE, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}

export function useUpdatePageContent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePageContentInput }) =>
      fetchJSON(`${BASE}/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}

export function useDeletePageContent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => fetchJSON(`${BASE}/${id}`, { method: "DELETE" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}
