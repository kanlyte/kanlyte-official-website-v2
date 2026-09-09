"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateTeamMemberInput, UpdateTeamMemberInput } from "../dtos";

const BASE = "/api/team-members";
const KEY = "team-members";

async function fetchJSON(url: string, init?: RequestInit) {
  const res = await fetch(url, init);
  if (!res.ok) throw new Error((await res.json()).error ?? res.statusText);
  return res.json();
}

export function useTeamMembers(filter?: "active" | "featured") {
  const url = filter ? `${BASE}?filter=${filter}` : BASE;
  return useQuery({ queryKey: [KEY, { filter }], queryFn: () => fetchJSON(url) });
}

export function useTeamMember(id: string) {
  return useQuery({
    queryKey: [KEY, id],
    queryFn: () => fetchJSON(`${BASE}/${id}`),
    enabled: !!id,
  });
}

export function useCreateTeamMember() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateTeamMemberInput) =>
      fetchJSON(BASE, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}

export function useUpdateTeamMember() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTeamMemberInput }) =>
      fetchJSON(`${BASE}/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: [KEY] });
      qc.invalidateQueries({ queryKey: [KEY, id] });
    },
  });
}

export function useDeleteTeamMember() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => fetchJSON(`${BASE}/${id}`, { method: "DELETE" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}
