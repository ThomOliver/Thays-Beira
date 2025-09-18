"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Menu, Sun, Moon, ShoppingCart } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useUIStore } from "@/store/useUIStore";
import { useArtistStore } from "@/store/artistStore";
import { getArtistBySlug } from "@/services/artistService";
import { useCartStore } from "@/store/cartStore";
import throttle from "lodash/throttle";
import React from "react";
import { useSyncTheme } from "@/hooks/useSyncTheme";

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
          <Link
            href="/"
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative">
              <Image
                src={artist?.profilePic || "https://placehold.co/40x40"}
                alt={artist?.name || "Artista"}
                width={50}
                height={50}
                unoptimized
                className="rounded-full object-cover ring-2 ring-transparent group-hover:ring-primary transition-all duration-300"
              />
            </div>
            <span
              className={`uppercase font-semibold text-lg tracking-wide transition-colors duration-300 ${
                isOnTop ? "text-white" : "text-gray-800 dark:text-gray-200"
              }`}
            >
              {artist?.name || "Carregando..."}
            </span>
          </Link>
          {renderedNavMenu}
        </div>

        <div className="flex items-center space-x-4">

          {!showCart && (
            <SocialIcons artist={artist} isOnTop={isOnTop} />
          )}

          <button
            onClick={toggleTheme}
            className={`p-2 mt-1 rounded-full transition-colors duration-300 ${
              isOnTop
                ? "hover:bg-white/20"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            {isDark ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon
                className={`h-5 w-5 ${
                  isOnTop
                    ? "text-white"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              />
            )}
          </button>

          {showCart && (
            <Link href="/store/cart" className="relative">
              <ShoppingCart
                className={`w-6 h-6 ${
                  isOnTop ? "text-white" : "text-gray-700 dark:text-gray-300"
                }`}
              />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className={`p-2 rounded-full transition-colors duration-300 ${
                isOnTop
                  ? "hover:bg-white/20"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <Menu
                className={`h-5 w-5 ${
                  isOnTop
                    ? "text-white"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
HeaderComponent.displayName = "HeaderComponent";

export default React.memo(HeaderComponent);
