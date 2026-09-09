"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ResourceCategoryKind } from "../dtos";

export interface ResourceCategory {
  id: string;
  name: string;
  slug: string;
  pricingEnabled?: boolean;
  ownerType?: string;
  ownerSlug?: string | null;
  serviceId?: string | null;
  productId?: string | null;
  service?: { id: string; title: string; kind: string; parent?: { id: string; title: string } | null } | null;
  product?: { id: string; title: string } | null;
  _count?: { plans: number };
}

async function fetchJSON(url: string, init?: RequestInit) {
  const response = await fetch(url, init);
  if (!response.ok) throw new Error((await response.json()).error ?? response.statusText);
  return response.json();
}

export function useResourceCategories(kind: ResourceCategoryKind) {
  return useQuery<ResourceCategory[]>({
    queryKey: ["resource-categories", kind],
    queryFn: () => fetchJSON(`/api/categories/${kind}`),
  });
}

export function useCreateResourceCategory(kind: ResourceCategoryKind) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { name: string; slug: string }) =>
      fetchJSON(`/api/categories/${kind}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }) as Promise<ResourceCategory>,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["resource-categories", kind] }),
  });
}

export function useUpdateResourceCategory(kind: ResourceCategoryKind) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      fetchJSON(`/api/categories/${kind}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, name }),
      }) as Promise<ResourceCategory>,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["resource-categories", kind] }),
  });
}

export function useDeleteResourceCategory(kind: ResourceCategoryKind) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetchJSON(`/api/categories/${kind}?id=${id}`, { method: "DELETE" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["resource-categories", kind] }),
  });
}
