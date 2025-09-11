import { create } from "zustand";

type UIState = {
  isMenuOpen: boolean;
  isDark: boolean;
  collapsed: boolean;
  toggleMenu: () => void;
  toggleTheme: () => void;
  toggleCollapsed: () => void;
  initializeTheme: () => void;
};

export const useUIStore = create<UIState>((set) => ({
  isMenuOpen: false,
  isDark: false,
  collapsed: false,

  toggleMenu: () => set((s) => ({ isMenuOpen: !s.isMenuOpen })),
  toggleCollapsed: () => set((s) => ({ collapsed: !s.collapsed })),
  toggleTheme: () => set((s) => ({ isDark: !s.isDark })),

  initializeTheme: () => {
    if (typeof window === "undefined") return;

    const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const stored = localStorage.getItem("theme");
    const isDark = stored === "dark" || (!stored && isSystemDark);

    set({ isDark });
  },
}));
