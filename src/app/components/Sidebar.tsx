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
function SidebarComponent() {
  const { isMenuOpen, isDark, toggleMenu, toggleTheme, initializeTheme, collapsed } = useUIStore();
  const { artist, setArtist, setLoading, setError, slug } = useArtistStore();
  const router = useRouter();
  const pathname = usePathname();

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

  const menuItems = useMemo(
    () => [
      { label: "Sobre", href: "/about" },
      { label: "Obras", href: "/artwork" },
      { label: "Exposições", href: "/exhibition" },
      { label: "Contato", href: "/contact" },
      { label: "Loja", href: "/store" },
    ],
    []
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

      <NavMenu
        navItems={menuItems}
        pathname={pathname}
        handleLinkClick={handleLinkClick}
        isOnTop={false}
      />

      <div className="absolute bottom-4 left-0 w-full px-4 flex flex-col gap-4">
        {!collapsed && <SocialLinks links={socialLinks} />}
        <ThemeToggle
          isDark={isDark}
          isOnTop={false} 
          toggleTheme={toggleTheme}
        />
      </div>
    </aside>
  );
}
SidebarComponent.displayName = "SidebarComponent";

export default React.memo(SidebarComponent);
