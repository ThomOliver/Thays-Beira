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

  toggleMenu: () =>
    set((state) => ({ isMenuOpen: !state.isMenuOpen })),

  toggleCollapsed: () =>
    set((state) => ({ collapsed: !state.collapsed })),

  toggleTheme: () =>
    set((state) => {
      const newDark = !state.isDark;
      if (typeof window !== "undefined") {
        const root = document.documentElement;
        if (newDark) {
          root.classList.add("dark");
          localStorage.setItem("theme", "dark");
        } else {
          root.classList.remove("dark");
          localStorage.setItem("theme", "light");
        }
      }
      return { isDark: newDark };
    }),

  initializeTheme: () => {
    if (typeof window === "undefined") return;

    const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const stored = localStorage.getItem("theme");
    const isDark = stored === "dark" || (!stored && isSystemDark);

    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    set({ isDark });
  },
}));
