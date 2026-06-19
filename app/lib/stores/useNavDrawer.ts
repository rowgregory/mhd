import { create } from "zustand";

type NavDrawerState = {
  open: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
};

export const useNavDrawer = create<NavDrawerState>()((set) => ({
  open: false,
  openDrawer: () => set({ open: true }),
  closeDrawer: () => set({ open: false }),
  toggleDrawer: () => set((s) => ({ open: !s.open })),
}));
