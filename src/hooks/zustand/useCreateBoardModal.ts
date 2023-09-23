import { create } from "zustand";

type useCreateBoardModalStore = {
  isOpen: boolean;
  setOpen: () => void;
  setClose: () => void;
};

export const useCreateBoardModal = create<useCreateBoardModalStore>((set) => ({
  isOpen: false,
  setOpen: () => set({ isOpen: true }),
  setClose: () => set({ isOpen: false }),
}));
