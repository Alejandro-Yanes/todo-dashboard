import { create } from "zustand";

type useCreateTodoModalStore = {
  isOpen: boolean;
  setOpen: () => void;
  setClose: () => void;
};

export const useCreateTodoModal = create<useCreateTodoModalStore>((set) => ({
  isOpen: false,
  setOpen: () => set({ isOpen: true }),
  setClose: () => set({ isOpen: false }),
}));
