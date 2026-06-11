import { create } from "zustand";

interface TableState {
  search: string;
  page: number;
  pageSize: number;
  filters: Record<string, string>;
  setSearch: (search: string) => void;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setFilter: (key: string, value: string) => void;
  clearFilter: (key: string) => void;
  reset: () => void;
}

const defaults = {
  search: "",
  page: 1,
  pageSize: 10,
  filters: {},
};

export const useTableStore = create<TableState>()((set) => ({
  ...defaults,
  setSearch: (search) => set({ search, page: 1 }),
  setPage: (page) => set({ page }),
  setPageSize: (pageSize) => set({ pageSize, page: 1 }),
  setFilter: (key, value) =>
    set((s) => ({ filters: { ...s.filters, [key]: value }, page: 1 })),
  clearFilter: (key) =>
    set((s) => {
      const filters = { ...s.filters };
      delete filters[key];
      return { filters, page: 1 };
    }),
  reset: () => set(defaults),
}));
