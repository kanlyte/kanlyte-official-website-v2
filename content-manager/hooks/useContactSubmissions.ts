"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateContactSubmissionInput, UpdateContactSubmissionInput } from "../dtos";

const BASE = "/api/contact-submissions";
const KEY = "contact-submissions";

async function fetchJSON(url: string, init?: RequestInit) {
  const res = await fetch(url, init);
  if (!res.ok) throw new Error((await res.json()).error ?? res.statusText);
  return res.json();
}

export function useContactSubmissions(status?: string) {
  const url = status ? `${BASE}?status=${status}` : BASE;
  return useQuery({ queryKey: [KEY, { status }], queryFn: () => fetchJSON(url) });
}

export function useContactSubmission(id: string) {
  return useQuery({
    queryKey: [KEY, id],
    queryFn: () => fetchJSON(`${BASE}/${id}`),
    enabled: !!id,
  });
}

export function useCreateContactSubmission() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateContactSubmissionInput) =>
      fetchJSON(BASE, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}

export function useUpdateContactSubmission() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateContactSubmissionInput }) =>
      fetchJSON(`${BASE}/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: [KEY] });
      qc.invalidateQueries({ queryKey: [KEY, id] });
    },
  });
}

export function useDeleteContactSubmission() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => fetchJSON(`${BASE}/${id}`, { method: "DELETE" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}
