"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Bars3Icon, SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useUIStore } from "@/store/useUIStore";
import { useRouter, usePathname } from "next/navigation";
import { useArtistStore } from "@/store/artistStore";
import { getArtistBySlug } from "@/services/artistService";
import { FaInstagram, FaFacebookF, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Header() {
  const { isDark, toggleMenu, toggleTheme, initializeTheme } = useUIStore();
  const router = useRouter();
  const pathname = usePathname();

  const { artist, setArtist, setLoading, setError } = useArtistStore();
  const [isOnTop, setIsOnTop] = useState(true);

  useEffect(() => {
    initializeTheme();

    if (!artist) {
      setLoading(true);
      getArtistBySlug("thays-beira")
        .then((data) => setArtist(data))
        .catch(() => setError("Não foi possível carregar os dados do artista."))
        .finally(() => setLoading(false));
    }

    if (pathname === "/") {
      const handleScroll = () => {
        const swiperHeight = 500;
        setIsOnTop(window.scrollY < swiperHeight - 80);
      };

      window.addEventListener("scroll", handleScroll);
      handleScroll(); // Define estado inicial ao montar

      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      setIsOnTop(false); // Nas outras páginas, sempre false
    }
  }, [initializeTheme, artist, setArtist, setLoading, setError, pathname]);

  const handleLinkClick = (href: string) => {
    router.push(href);
    toggleMenu();
  };

  const navItems = [
    { label: "Sobre", href: "/about" },
    { label: "Obras", href: "/artwork" },
    { label: "Exposições", href: "/exhibition" },
    { label: "Contato", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isOnTop
          ? "bg-gradient-to-b from-black/90 via-black/50 to-transparent"
          : "backdrop-blur-md dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 shadow-sm"
      }`}
    >
      <div className="max-w-[1900px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo e nome */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 cursor-pointer group">
            <img
              src={artist?.profilePic || "https://placehold.co/40x40"}
              alt={artist?.name || "Artista"}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-transparent group-hover:ring-primary transition-all duration-300"
            />
            <span
              className={`uppercase font-semibold text-lg tracking-wide transition-colors duration-300 ${
                isOnTop ? "text-white" : "text-gray-800 dark:text-gray-200"
              }`}
            >
              {artist?.name || "Carregando..."}
            </span>
          </Link>

          {/* Menu desktop */}
          <nav className="hidden md:flex items-center gap-4">
            {navItems.map((item, idx) => {
              const isActive = pathname === item.href;
              return (
                <div key={item.href} className="flex items-center gap-3 relative">
                  <button
                    onClick={() => handleLinkClick(item.href)}
                    className={`relative text-base font-medium tracking-wide transition-colors duration-300
                      ${isOnTop
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
                        isOnTop ? "text-white" : "text-gray-400 dark:text-gray-600"
                      }`}
                    >
                      |
                    </span>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Ações */}
        <div className="flex items-center space-x-4">
          {/* Redes sociais */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://www.instagram.com/thays.beira/"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors duration-300 ${
                isOnTop ? "text-white hover:text-pink-400" : "text-gray-700 dark:text-gray-300 hover:text-pink-400"
              }`}
            >
              <FaInstagram className="w-5 h-5" />
            </a>
            <a
              href="https://facebook.com/seu_perfil"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors duration-300 ${
                isOnTop ? "text-white hover:text-blue-500" : "text-gray-700 dark:text-gray-300 hover:text-blue-500"
              }`}
            >
              <FaFacebookF className="w-5 h-5" />
            </a>
            <a
              href="https://tiktok.com/@seu_perfil"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors duration-300 ${
                isOnTop ? "text-white hover:text-gray-200" : "text-gray-700 dark:text-gray-300 hover:text-gray-200"
              }`}
            >
              <FaTiktok className="w-5 h-5" />
            </a>
            <a
              href="https://x.com/seu_perfil"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors duration-300 ${
                isOnTop ? "text-white hover:text-black dark:hover:text-white" : "text-gray-700 dark:text-gray-300 hover:text-black"
              }`}
            >
              <FaXTwitter className="w-5 h-5" />
            </a>
            <span
              className={`text-lg select-none pl-1 ${
                isOnTop ? "text-white" : "text-gray-400 dark:text-gray-600"
              }`}
            >
              |
            </span>
          </div>

          {/* Tema */}
          <button
            onClick={toggleTheme}
            className={`p-2 mt-1 rounded-full transition-colors duration-300 ${
              isOnTop ? "hover:bg-white/20" : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            {isDark ? (
              <SunIcon className="h-5 w-5 text-yellow-400" />
            ) : (
              <MoonIcon
                className={`h-5 w-5 ${
                  isOnTop ? "text-white" : "text-gray-700 dark:text-gray-300"
                }`}
              />
            )}
          </button>

          {/* Menu Mobile */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className={`p-2 rounded-full transition-colors duration-300 ${
                isOnTop ? "hover:bg-white/20" : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <Bars3Icon
                className={`h-5 w-5 ${
                  isOnTop ? "text-white" : "text-gray-700 dark:text-gray-300"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
