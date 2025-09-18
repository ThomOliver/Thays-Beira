"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import { useRouter, usePathname } from "next/navigation";
import { useUIStore } from "@/store/useUIStore";
import { useArtistStore } from "@/store/artistStore";
import { getArtistBySlug } from "@/services/artistService";
import { useCartStore } from "@/store/cartStore";
import throttle from "lodash/throttle";
import React from "react";
import { useSyncTheme } from "@/hooks/useSyncTheme";
import ArtistLogo from "./ArtistLogo";
import ThemeToggle from "./ThemeToggle";
import CartButton from "./CartButton";
import MobileMenuButton from "./MobileMenuButton";

const NavMenu = dynamic(() =>
  import("@/app/components/NavMenu").then((mod) => mod.default)
);
const SocialIcons = dynamic(() =>
  import("@/app/components/SocialIcons").then((mod) => mod.default)
);

interface HeaderProps {
  navItems?: { label: string; href: string }[];
  showCart?: boolean;
}

const HeaderComponent: React.FC<HeaderProps> = ({ navItems, showCart }) => {
  const { isDark, toggleMenu, toggleTheme, initializeTheme } = useUIStore();
  const router = useRouter();
  const pathname = usePathname();
  const { artist, setArtist, setLoading, setError, slug } = useArtistStore();
  const { items } = useCartStore();
  const [isOnTop, setIsOnTop] = useState(true);
  useSyncTheme();

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const defaultNavItems = useMemo(
    () =>
      artist
        ? [
            { label: "Sobre", href: "/about" },
            { label: "Obras", href: "/artwork" },
            { label: "Exposições", href: "/exhibition" },
            { label: "Contato", href: "/contact" },
            { label: "Loja", href: "/store" },
          ]
        : [],
    [artist]
  );

  const finalNavItems = navItems ?? defaultNavItems;

  useEffect(() => {
    initializeTheme();
    if (!artist) {
      setLoading(true);
      getArtistBySlug(slug)
        .then(setArtist)
        .catch(() =>
          setError("Não foi possível carregar os dados do artista.")
        )
        .finally(() => setLoading(false));
    }
  }, [initializeTheme, artist, setArtist, setLoading, setError, slug]);

  useEffect(() => {
    if (pathname !== "/") {
      setIsOnTop(false);
      return;
    }
    const handleScroll = throttle(
      () => setIsOnTop(window.scrollY < 420),
      100
    );
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleLinkClick = useCallback(
    (href: string) => {
      router.push(href);
      toggleMenu();
    },
    [router, toggleMenu]
  );

  const renderedNavMenu = useMemo(() => {
    if (!finalNavItems.length) return null;
    return (
      <NavMenu
        navItems={finalNavItems}
        pathname={pathname}
        handleLinkClick={handleLinkClick}
        isOnTop={isOnTop}
      />
    );
  }, [finalNavItems, pathname, handleLinkClick, isOnTop]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isOnTop
          ? "bg-gradient-to-b from-black/90 via-black/50 to-transparent"
          : "backdrop-blur-md dark:border-gray-800 bg-white/80 dark:bg-bg/80 shadow-sm"
      }`}
    >
      <div className="max-w-[1900px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <ArtistLogo artist={artist} isOnTop={isOnTop} />
          {renderedNavMenu}
        </div>

        <div className="flex items-center space-x-4">
          {!showCart && <SocialIcons artist={artist} isOnTop={isOnTop} />}

          <ThemeToggle isDark={isDark} isOnTop={isOnTop} toggleTheme={toggleTheme} />

          {showCart && <CartButton totalItems={totalItems} isOnTop={isOnTop} />}

          <div className="md:hidden">
            <MobileMenuButton toggleMenu={toggleMenu} isOnTop={isOnTop} />
          </div>
        </div>
      </div>
    </header>
  );
};
HeaderComponent.displayName = "HeaderComponent";

export default React.memo(HeaderComponent);
