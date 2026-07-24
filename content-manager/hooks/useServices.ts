"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateServiceInput, UpdateServiceInput } from "../dtos";

const BASE = "/api/services";
const KEY = "services";

async function fetchJSON(url: string, init?: RequestInit) {
  const res = await fetch(url, init);
  if (!res.ok) throw new Error((await res.json()).error ?? res.statusText);
  return res.json();
}

export function useServices(activeOnly = false) {
  const url = activeOnly ? `${BASE}?active=true` : BASE;
  return useQuery({ queryKey: [KEY, { activeOnly }], queryFn: () => fetchJSON(url) });
}

export function useService(id: string) {
  return useQuery({
    queryKey: [KEY, id],
    queryFn: () => fetchJSON(`${BASE}/${id}`),
    enabled: !!id,
  });
}

export function useServiceBySlug(slug: string) {
  return useQuery({
    queryKey: [KEY, "slug", slug],
    queryFn: () => fetchJSON(`${BASE}?slug=${slug}`),
    enabled: !!slug,
  });
}

export function useCreateService() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateServiceInput) =>
      fetchJSON(BASE, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}

export function useUpdateService() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateServiceInput }) =>
      fetchJSON(`${BASE}/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: [KEY] });
      qc.invalidateQueries({ queryKey: [KEY, id] });
    },
  });
}

export function useDeleteService() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => fetchJSON(`${BASE}/${id}`, { method: "DELETE" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}
