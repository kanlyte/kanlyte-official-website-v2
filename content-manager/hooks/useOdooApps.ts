"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateOdooAppInput, UpdateOdooAppInput } from "../dtos";

const BASE = "/api/odoo-apps";
const KEY = "odoo-apps";

async function fetchJSON(url: string, init?: RequestInit) {
  const res = await fetch(url, init);
  if (!res.ok) throw new Error((await res.json()).error ?? res.statusText);
  return res.json();
}

export function useOdooApps(activeOnly = false) {
  const url = activeOnly ? `${BASE}?active=true` : BASE;
  return useQuery({ queryKey: [KEY, { activeOnly }], queryFn: () => fetchJSON(url) });
}

export function useOdooApp(id: string) {
  return useQuery({
    queryKey: [KEY, id],
    queryFn: () => fetchJSON(`${BASE}/${id}`),
    enabled: !!id,
  });
}

export function useCreateOdooApp() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateOdooAppInput) =>
      fetchJSON(BASE, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}

export function useUpdateOdooApp() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateOdooAppInput }) =>
      fetchJSON(`${BASE}/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: [KEY] });
      qc.invalidateQueries({ queryKey: [KEY, id] });
    },
  });
}

export function useDeleteOdooApp() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => fetchJSON(`${BASE}/${id}`, { method: "DELETE" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}
