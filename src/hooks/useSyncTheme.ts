"use client";

import { useEffect } from "react";
import { useUIStore } from "@/store/useUIStore";

export function useSyncTheme() {
  const isDark = useUIStore((s) => s.isDark);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);
}
