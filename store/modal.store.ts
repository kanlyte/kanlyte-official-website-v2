import { create } from "zustand";

type ModalType = "create" | "edit" | "delete" | null;

interface ModalState {
  type: ModalType;
  resource: string | null;
  record: Record<string, unknown> | null;
  open: (type: Exclude<ModalType, null>, resource: string, record?: Record<string, unknown>) => void;
  close: () => void;
}

export const useModalStore = create<ModalState>()((set) => ({
  type: null,
  resource: null,
  record: null,
  open: (type, resource, record = {}) => set({ type, resource, record }),
  close: () => set({ type: null, resource: null, record: null }),
}));
