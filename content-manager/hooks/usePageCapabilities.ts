"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreatePageCapabilityInput, UpdatePageCapabilityInput } from "../dtos";

const BASE = "/api/page-capabilities";
const KEY = "page-capabilities";

async function fetchJSON(url: string, init?: RequestInit) {
  const res = await fetch(url, init);
  if (!res.ok) throw new Error((await res.json()).error ?? res.statusText);
  return res.json();
}

export function useAllPageCapabilities() {
  return useQuery({ queryKey: [KEY], queryFn: () => fetchJSON(BASE) });
}

export function usePageCapabilities(slug: string) {
  return useQuery({
    queryKey: [KEY, slug],
    queryFn: () => fetchJSON(`${BASE}?slug=${slug}`),
    enabled: !!slug,
  });
}

export function useCreatePageCapability() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreatePageCapabilityInput) =>
      fetchJSON(BASE, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}

export function useUpdatePageCapability() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePageCapabilityInput }) =>
      fetchJSON(`${BASE}/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}

export function useDeletePageCapability() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => fetchJSON(`${BASE}/${id}`, { method: "DELETE" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}
