"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  Sun,
  Moon,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Music2,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useUIStore } from "@/store/useUIStore";
import { useArtistStore } from "@/store/artistStore";
import { getArtistBySlug } from "@/services/artistService";
import throttle from "lodash/throttle";
import React from "react";
import { useSyncTheme } from "@/hooks/useSyncTheme";

interface NavItem {
  label: string;
  href: string;
}

interface NavMenuProps {
  navItems: NavItem[];
  pathname: string;
  handleLinkClick: (href: string) => void;
  isOnTop: boolean;
}

// NavMenu memoizado
const NavMenu: React.FC<NavMenuProps> = ({
  navItems,
  pathname,
  handleLinkClick,
  isOnTop,
}) => (
  <nav className="hidden md:flex items-center gap-4">
    {navItems.map((item, idx) => {
      const isActive = pathname === item.href;
      return (
        <div key={item.href} className="flex items-center gap-3 relative">
          <button
            onClick={() => handleLinkClick(item.href)}
            className={`relative text-base font-medium tracking-wide transition-colors duration-300 ${
              isOnTop
                ? isActive
                  ? "text-primary"
                  : "text-white hover:text-primary"
                : isActive
                ? "text-primary"
                : "text-gray-700 dark:text-gray-300 hover:text-primary"
            }`}
          >
            {item.label}
            {isActive && (
              <span className="absolute left-0 -bottom-0.5 w-full h-[2px] bg-primary rounded-full"></span>
            )}
          </button>
          {idx < navItems.length - 1 && (
            <span
              className={`text-lg select-none pl-1 ${
                isOnTop
                  ? "text-white"
                  : "text-gray-400 dark:text-gray-600"
              }`}
            >
              |
            </span>
          )}
        </div>
      );
    })}
  </nav>
);
NavMenu.displayName = "NavMenu";

interface Artist {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  xtwitter?: string;
  linkedin?: string;
  profilePic?: string;
  name?: string;
}

interface SocialIconsProps {
  artist?: Artist | null;
  isOnTop: boolean;
}

// SocialIcons memoizado
const SocialIcons: React.FC<SocialIconsProps> = ({ artist, isOnTop }) => (
  <div className="hidden md:flex items-center space-x-4">
    {artist?.instagram && (
      <a
        href={artist.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className={`transition-colors duration-300 ${
          isOnTop
            ? "text-white hover:text-pink-400"
            : "text-gray-700 dark:text-gray-300 hover:text-pink-400"
        }`}
      >
        <Instagram className="w-5 h-5" />
      </a>
    )}
    {artist?.facebook && (
      <a
        href={artist.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className={`transition-colors duration-300 ${
          isOnTop
            ? "text-white hover:text-blue-500"
            : "text-gray-700 dark:text-gray-300 hover:text-blue-500"
        }`}
      >
        <Facebook className="w-5 h-5" />
      </a>
    )}
    {artist?.tiktok && (
      <a
        href={artist.tiktok}
        target="_blank"
        rel="noopener noreferrer"
        className={`transition-colors duration-300 ${
          isOnTop
            ? "text-white hover:text-gray-200"
            : "text-gray-700 dark:text-gray-300 hover:text-gray-200"
        }`}
      >
        <Music2 className="w-5 h-5" />
      </a>
    )}
    {artist?.xtwitter && (
      <a
        href={artist.xtwitter}
        target="_blank"
        rel="noopener noreferrer"
        className={`transition-colors duration-300 ${
          isOnTop
            ? "text-white hover:text-black dark:hover:text-white"
            : "text-gray-700 dark:text-gray-300 hover:text-black"
        }`}
      >
        <Twitter className="w-5 h-5" />
      </a>
    )}
    {artist?.linkedin && (
      <a
        href={artist.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className={`transition-colors duration-300 ${
          isOnTop
            ? "text-white hover:text-blue-600"
            : "text-gray-700 dark:text-gray-300 hover:text-blue-600"
        }`}
      >
        <Linkedin className="w-5 h-5" />
      </a>
    )}
    <span
      className={`text-lg select-none pl-1 ${
        isOnTop ? "text-white" : "text-gray-400 dark:text-gray-600"
      }`}
    >
      |
    </span>
  </div>
);
SocialIcons.displayName = "SocialIcons";

const HeaderComponent: React.FC = () => {
  const { isDark, toggleMenu, toggleTheme, initializeTheme } = useUIStore();
  const router = useRouter();
  const pathname = usePathname();
  const { artist, setArtist, setLoading, setError } = useArtistStore();
  const [isOnTop, setIsOnTop] = useState(true);
  useSyncTheme();

  const navItems = useMemo(
    () => [
      { label: "Sobre", href: "/about" },
      { label: "Obras", href: "/artwork" },
      { label: "Exposições", href: "/exhibition" },
      { label: "Contato", href: "/contact" },
    ],
    []
  );

  useEffect(() => {
    initializeTheme();
    if (!artist) {
      setLoading(true);
      getArtistBySlug("thays-beira")
        .then(setArtist)
        .catch(() => setError("Não foi possível carregar os dados do artista."))
        .finally(() => setLoading(false));
    }
  }, [initializeTheme, artist, setArtist, setLoading, setError]);

  useEffect(() => {
    if (pathname !== "/") {
      setIsOnTop(false);
      return;
    }
    const handleScroll = throttle(() => setIsOnTop(window.scrollY < 420), 100);
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

  const renderedNavMenu = useMemo(
    () => (
      <NavMenu
        navItems={navItems}
        pathname={pathname}
        handleLinkClick={handleLinkClick}
        isOnTop={isOnTop}
      />
    ),
    [navItems, pathname, handleLinkClick, isOnTop]
  );

  const renderedSocialIcons = useMemo(
    () => <SocialIcons artist={artist} isOnTop={isOnTop} />,
    [artist, isOnTop]
  );

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isOnTop
          ? "bg-gradient-to-b from-black/90 via-black/50 to-transparent"
          : "backdrop-blur-md dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 shadow-sm"
      }`}
    >
      <div className="max-w-[1900px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-10 h-10">
              <Image
                src={artist?.profilePic || "https://placehold.co/40x40"}
                alt={artist?.name || "Artista"}
                width={40}
                height={40}
                className="rounded-full object-cover ring-2 ring-transparent group-hover:ring-primary transition-all duration-300"
              />
            </div>
            <span
              className={`uppercase font-semibold text-lg tracking-wide transition-colors duration-300 ${
                isOnTop
                  ? "text-white"
                  : "text-gray-800 dark:text-gray-200"
              }`}
            >
              {artist?.name || "Carregando..."}
            </span>
          </Link>
          {renderedNavMenu}
        </div>

        <div className="flex items-center space-x-4">
          {renderedSocialIcons}
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
