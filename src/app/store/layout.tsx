'use client';

import { ReactNode } from 'react';
import Header from '../components/Header';

export default function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header
        showCart
        navItems={[
          { label: "Início", href: "/" },
          { label: "Loja", href: "/store" },
          { label: "Contato", href: "/contact" },
        ]}
      />
      <main className="min-h-screen bg-bg text-text">
        {children}
      </main>
    </>
  );
}
