'use client';

import { ReactNode } from 'react';
import Header from '../components/Header';

export default function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
        <Header
          showCart
          navItems={[
            { label: "Início", href: "/" },
            { label: "Obras", href: "/store/artwork" },
            { label: "Contato", href: "/store/contact" },
          ]}
        />
        <main className="min-h-screen bg-bg text-text">
          {children}
        </main>
      </body>
    </html>
  );
}
