"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateStatInput, UpdateStatInput } from "../dtos";

const BASE = "/api/stats";
const KEY = "stats";

async function fetchJSON(url: string, init?: RequestInit) {
  const res = await fetch(url, init);
  if (!res.ok) throw new Error((await res.json()).error ?? res.statusText);
  return res.json();
}

export function useStats() {
  return useQuery({ queryKey: [KEY], queryFn: () => fetchJSON(BASE) });
}

export function useStat(id: string) {
  return useQuery({
    queryKey: [KEY, id],
    queryFn: () => fetchJSON(`${BASE}/${id}`),
    enabled: !!id,
  });
}

export function useCreateStat() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateStatInput) =>
      fetchJSON(BASE, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}

export function useUpdateStat() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateStatInput }) =>
      fetchJSON(`${BASE}/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: [KEY] });
      qc.invalidateQueries({ queryKey: [KEY, id] });
    },
  });
}

export function useDeleteStat() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => fetchJSON(`${BASE}/${id}`, { method: "DELETE" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}
