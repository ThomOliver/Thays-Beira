'use client';

import './globals.css';
import { ReactNode, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useMediaQuery } from 'react-responsive';

const Header = dynamic(() => import('@/app/components/Header').then(mod => mod.default));
const Sidebar = dynamic(() => import('@/app/components/Sidebar').then(mod => mod.default), { ssr: false });
const Footer = dynamic(() => import('@/app/components/Footer').then(mod => mod.default));

export default function SiteLayout({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <html>
      <body>
        <Header />
        
        {mounted && isMobile && <Sidebar />}

        <main className="min-h-screen bg-neutral text-text dark:bg-neutral dark:text-text transition-all duration-300">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
