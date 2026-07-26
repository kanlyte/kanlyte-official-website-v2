"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreatePricingPlanInput, UpdatePricingPlanInput } from "../dtos";

const BASE = "/api/pricing-plans";
const KEY = "pricing-plans";

async function fetchJSON(url: string, init?: RequestInit) {
  const res = await fetch(url, init);
  if (!res.ok) throw new Error((await res.json()).error ?? res.statusText);
  return res.json();
}

export function usePricingPlans(category?: string) {
  const url = category ? `${BASE}?category=${category}` : BASE;
  return useQuery({ queryKey: [KEY, { category }], queryFn: () => fetchJSON(url) });
}

export function usePricingPlan(id: string) {
  return useQuery({
    queryKey: [KEY, id],
    queryFn: () => fetchJSON(`${BASE}/${id}`),
    enabled: !!id,
  });
}

export function useCreatePricingPlan() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreatePricingPlanInput) =>
      fetchJSON(BASE, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}

export function useUpdatePricingPlan() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePricingPlanInput }) =>
      fetchJSON(`${BASE}/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: [KEY] });
      qc.invalidateQueries({ queryKey: [KEY, id] });
    },
  });
}

export function useTogglePricingEnabled() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ category, pricingEnabled }: { category: string; pricingEnabled: boolean }) =>
      fetchJSON(BASE, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ category, pricingEnabled }) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}

export function useDeletePricingPlan() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => fetchJSON(`${BASE}/${id}`, { method: "DELETE" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}
