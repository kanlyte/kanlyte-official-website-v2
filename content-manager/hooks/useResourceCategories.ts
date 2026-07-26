"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ResourceCategoryKind } from "../dtos";

export interface ResourceCategory {
  id: string;
  name: string;
  slug: string;
  pricingEnabled?: boolean;
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
