"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { ContactInfoInput } from "../dtos/contact-info.dto";

const BASE = "/api/contact-info";
const KEY = "contact-info";

async function fetchJSON(url: string, init?: RequestInit) {
  const res = await fetch(url, init);
  if (!res.ok) throw new Error((await res.json()).error ?? res.statusText);
  return res.json();
}

export function useContactInfo() {
  return useQuery({ queryKey: [KEY], queryFn: () => fetchJSON(BASE) });
}

export function useUpsertContactInfo() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: ContactInfoInput) =>
      fetchJSON(BASE, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}
