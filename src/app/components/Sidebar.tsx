"use client";
import { useUIStore } from "@/store/useUIStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import { useArtistStore } from "@/store/artistStore";
import { getArtistBySlug } from "@/services/artistService";
import { FaInstagram, FaFacebookF, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Sidebar() {
  const {
    isMenuOpen,
    isDark,
    toggleMenu,
    toggleTheme,
    initializeTheme,
    collapsed,
    toggleCollapsed,
  } = useUIStore();
  const { artist, setArtist, setLoading, setError } = useArtistStore();
  const router = useRouter();

  useEffect(() => {
    initializeTheme();

    if (!artist) {
      setLoading(true);
      getArtistBySlug("thays-beira")
        .then((data) => setArtist(data))
        .catch(() => setError("Não foi possível carregar os dados do artista."))
        .finally(() => setLoading(false));
    }
  }, [initializeTheme, artist, setArtist, setLoading, setError]);

  const handleLinkClick = (href: string) => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      router.push(href);
      toggleMenu();
    } else {
      router.push(href);
    }
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-bg text-text shadow-lg z-50 transition-all duration-300 md:hidden
        ${collapsed ? "w-20" : "w-64"} 
        ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} 
      `}
    >
      {/* Cabeçalho com logo, nome e botão colapsar */}
      <div className="flex items-center justify-between px-4 h-16 border-b border-gray-300 dark:border-gray-700">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <img
              src={artist?.profilePic || "https://placehold.co/40x40"}
              alt={artist?.name || "Artista"}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-transparent"
            />
            <span className="text-lg font-bold truncate">{artist?.name || "Carregando..."}</span>
          </div>
        )}
      </div>

      {/* Menu */}
      <nav className="flex flex-col space-y-4 mt-6 px-4">
        <button onClick={() => handleLinkClick("/dashboard")} className="text-left hover:text-primary">
          {"Dashboard"}
        </button>
        <button onClick={() => handleLinkClick("/user")} className="text-left hover:text-primary">
          {"Usuário"}
        </button>
        <button onClick={() => handleLinkClick("/category")} className="text-left hover:text-primary">
          {"Categoria"}
        </button>
        <button onClick={() => handleLinkClick("/artwork")} className="text-left hover:text-primary">
          {"Obras"}
        </button>
        <button onClick={() => handleLinkClick("/exhibition")} className="text-left hover:text-primary">
          {"Exposição"}
        </button>
      </nav>

      {/* Redes sociais e tema */}
      <div className="absolute bottom-4 left-0 w-full px-4 flex flex-col gap-4">
        {!collapsed && (
          <div className="flex items-center justify-start gap-3">
            <a href="https://www.instagram.com/thays.beira/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="w-5 h-5 hover:text-pink-400 transition-colors" />
            </a>
            <a href="https://facebook.com/seu_perfil" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="w-5 h-5 hover:text-blue-500 transition-colors" />
            </a>
            <a href="https://tiktok.com/@seu_perfil" target="_blank" rel="noopener noreferrer">
              <FaTiktok className="w-5 h-5 hover:text-gray-200 transition-colors" />
            </a>
            <a href="https://x.com/seu_perfil" target="_blank" rel="noopener noreferrer">
              <FaXTwitter className="w-5 h-5 hover:text-black dark:hover:text-white transition-colors" />
            </a>
          </div>
        )}

        <button onClick={toggleTheme}>
          {isDark ? (
            <SunIcon className="h-6 w-6 text-yellow-400" />
          ) : (
            <MoonIcon className="h-6 w-6" />
          )}
        </button>
      </div>
    </aside>
  );
}
