"use client";

import { useUIStore } from "@/store/useUIStore";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Sun, Moon, Instagram, Facebook, Twitter, Linkedin, Music2 } from "lucide-react";
import { useArtistStore } from "@/store/artistStore";
import { getArtistBySlug } from "@/services/artistService";
import Image from "next/image";
import React from "react";

// Menu memoizado
const MenuItems = React.memo(
  ({ items, onClick }: { items: { label: string; href: string }[]; onClick: (href: string) => void }) => (
    <nav className="flex flex-col space-y-4 mt-6 px-4">
      {items.map((item) => (
        <button
          key={item.href}
          onClick={() => onClick(item.href)}
          className="text-left hover:text-primary transition-colors"
          aria-label={`Ir para ${item.label}`}
        >
          {item.label}
        </button>
      ))}
    </nav>
  )
);
MenuItems.displayName = "MenuItems";

// Redes sociais memoizadas (usando os mesmos ícones do Header)
type SocialLink = {
  icon: React.ComponentType<{ className?: string }>;
  url?: string | null;
  label: string;
};

const SocialLinks = React.memo(({ socialLinks }: { socialLinks: SocialLink[] }) => (
  <div className="flex items-center justify-start gap-3">
    {socialLinks.map(
      (social, i) =>
        social.url && (
          <a
            key={i}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            title={social.label}
            aria-label={social.label}
          >
            <social.icon className="w-5 h-5 hover:text-primary transition-colors" />
          </a>
        )
    )}
  </div>
));
SocialLinks.displayName = "SocialLinks";

function SidebarComponent() {
  const { isMenuOpen, isDark, toggleMenu, toggleTheme, initializeTheme, collapsed } = useUIStore();
  const { artist, setArtist, setLoading, setError, slug } = useArtistStore();
  const router = useRouter();

  useEffect(() => {
    initializeTheme();

    if (!artist) {
      setLoading(true);
      getArtistBySlug(slug)
        .then(setArtist)
        .catch(() => setError("Não foi possível carregar os dados do artista."))
        .finally(() => setLoading(false));
    }
  }, [initializeTheme, artist, setArtist, setLoading, setError]);

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
      {/* Cabeçalho */}
      <div className="flex items-center justify-between px-4 h-16 border-b border-gray-300 dark:border-gray-700">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <Image
              src={artist?.profilePic || "https://placehold.co/40x40"}
              alt={artist?.name || "Artista"}
              width={40}
              height={40}
              priority
              className="rounded-full object-cover ring-2 ring-transparent group-hover:ring-primary transition-all duration-300"
            />
            <span className="text-lg font-bold truncate">{artist?.name || "Carregando..."}</span>
          </div>
        )}
      </div>

      {/* Menu */}
      <MenuItems items={menuItems} onClick={handleLinkClick} />

      {/* Redes sociais e tema */}
      <div className="absolute bottom-4 left-0 w-full px-4 flex flex-col gap-4">
        {!collapsed && <SocialLinks socialLinks={socialLinks} />}
        <button
          onClick={toggleTheme}
          aria-label="Alternar tema claro/escuro"
          className="self-start"
        >
          {isDark ? <Sun className="h-6 w-6 text-yellow-400" /> : <Moon className="h-6 w-6" />}
        </button>
      </div>
    </aside>
  );
}
SidebarComponent.displayName = "SidebarComponent";

export default React.memo(SidebarComponent);
