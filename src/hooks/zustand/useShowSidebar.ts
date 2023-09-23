import { create } from "zustand";

type useShowSidebarStore = {
  isOpen: boolean;
  toggleOpen: () => void;
};

export const useShowSidebar = create<useShowSidebarStore>((set) => ({
  isOpen: true,
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
}));
