"use client";

import { useUIStore } from "@/store/useUIStore";
import { useEffect, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Instagram, Facebook, Twitter, Linkedin, Music2 } from "lucide-react";
import { useArtistStore } from "@/store/artistStore";
import { getArtistBySlug } from "@/services/artistService";
import React from "react";
import ArtistLogo from "./ArtistLogo";
import ThemeToggle from "./ThemeToggle";
import SocialLinks from "./SocialLinks";
import NavMenu from "./NavMenu";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n/client";

function SidebarComponent() {
  const { isMenuOpen, isDark, toggleMenu, toggleTheme, initializeTheme, collapsed } = useUIStore();
  const { artist, setArtist, setLoading, setError, slug } = useArtistStore();
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation("common");

  useEffect(() => {
    initializeTheme();

    if (!artist) {
      setLoading(true);
      getArtistBySlug(slug)
        .then(setArtist)
        .catch(() => setError("Não foi possível carregar os dados do artista."))
        .finally(() => setLoading(false));
    }
  }, [initializeTheme, artist, setArtist, setLoading, setError, slug]);

  const handleLinkClick = (href: string) => {
    if (typeof window !== "undefined" && window.innerWidth < 768) toggleMenu();
    router.push(href);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const menuItems = useMemo(
    () => [
      { label: t("About"), href: "/about" },
      { label: t("Artworks"), href: "/artwork" },
      { label: t("Exhibitions"), href: "/exhibition" },
      { label: t("Contact"), href: "/contact" },
      { label: t("Store"), href: "/store" },
    ],
    [t]
  );

  const socialLinks = useMemo(
    () => [
      { icon: Instagram, url: artist?.instagram, label: "Instagram" },
      { icon: Facebook, url: artist?.facebook, label: "Facebook" },
      { icon: Music2, url: artist?.tiktok, label: "TikTok" },
      { icon: Twitter, url: artist?.xtwitter, label: "Twitter/X" },
      { icon: Linkedin, url: artist?.linkedin, label: "LinkedIn" },
    ],
    [artist]
  );

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-bg text-text shadow-lg z-50 transition-all duration-300 md:hidden
        ${collapsed ? "w-20" : "w-64"} 
        ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="flex flex-col">
        {/* Logo */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-gray-300 dark:border-gray-700">
          {!collapsed && (
            <ArtistLogo
              artist={artist}
              isOnTop={false}
              className="text-lg font-bold"
              imgSize={40} 
            />
          )}
        </div>

        {/* Botões de idioma */}
        {!collapsed && (
          <div className="flex justify-center gap-2 mt-2 px-4">
            <button
              className="px-2 py-1 bg-blue-500 text-white rounded hover:opacity-80 transition"
              onClick={() => changeLanguage("pt")}
            >
              PT
            </button>
            <button
              className="px-2 py-1 bg-green-500 text-white rounded hover:opacity-80 transition"
              onClick={() => changeLanguage("en")}
            >
              EN
            </button>
            <button
              className="px-2 py-1 bg-yellow-500 text-white rounded hover:opacity-80 transition"
              onClick={() => changeLanguage("es")}
            >
              ES
            </button>
            <button
              className="px-2 py-1 bg-red-500 text-white rounded hover:opacity-80 transition"
              onClick={() => changeLanguage("cn")}
            >
              CN
            </button>
          </div>
        )}

        {/* Menu de navegação */}
        <NavMenu
          navItems={menuItems}
          pathname={pathname}
          handleLinkClick={handleLinkClick}
          isOnTop={false}
          className="flex flex-col gap-4 mt-4 px-4"
        />

        {/* Social + ThemeToggle */}
        <div className="absolute bottom-4 left-0 w-full px-4 flex flex-col gap-4">
          {!collapsed && <SocialLinks links={socialLinks} />}
          <ThemeToggle
            isDark={isDark}
            isOnTop={false} 
            toggleTheme={toggleTheme}
          />
        </div>
      </div>
    </aside>
  );
}

SidebarComponent.displayName = "SidebarComponent";

export default React.memo(SidebarComponent);
