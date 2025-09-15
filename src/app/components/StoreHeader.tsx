'use client';

import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { useArtistStore } from "@/store/artistStore";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useState } from "react";

const StoreHeader = () => {
  const { artist, slug } = useArtistStore();
  const { items } = useCartStore();
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const [isOpen, setIsOpen] = useState(false);

  if (!artist) return null; // evita erro quando não carregar

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo + Nome */}
        <div className="flex items-center gap-3">
          <Image
            src={artist.profilePic}
            alt={artist.name}
            width={50}
            height={50}
            className="rounded-full object-cover"
          />
          <h1 className="text-xl font-bold">{artist.name}</h1>
        </div>

        {/* Menu desktop */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href={`/store`} className="hover:text-primary">
            Loja
          </Link>
          <Link href={`/}`} className="hover:text-primary">
            Sobre
          </Link>
          <Link href="/store/cart" className="relative">
            <ShoppingCart className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>

        {/* Botão mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 dark:text-gray-200"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t">
          <nav className="flex flex-col items-center gap-4 py-4">
            <Link href={`/store`} onClick={() => setIsOpen(false)}>
              Loja
            </Link>
            <Link href={`/`} onClick={() => setIsOpen(false)}>
              Sobre
            </Link>
            <Link href="/store/cccccccart" onClick={() => setIsOpen(false)} className="relative">
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default StoreHeader;
