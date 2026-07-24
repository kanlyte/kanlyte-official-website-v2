"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateNewsletterSubscriberInput } from "../dtos";

const BASE = "/api/newsletter-subscribers";
const KEY = "newsletter-subscribers";

async function fetchJSON(url: string, init?: RequestInit) {
  const res = await fetch(url, init);
  if (!res.ok) throw new Error((await res.json()).error ?? res.statusText);
  return res.json();
}

export function useNewsletterSubscribers() {
  return useQuery({ queryKey: [KEY], queryFn: () => fetchJSON(BASE) });
}

export function useSubscribeNewsletter() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateNewsletterSubscriberInput) =>
      fetchJSON(BASE, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}

export function useDeleteNewsletterSubscriber() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => fetchJSON(`${BASE}/${id}`, { method: "DELETE" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}
