'use client';
import './globals.css';
import { ReactNode } from 'react';
import Header from '@/app/components/Header';
import Sidebar from '@/app/components/Sidebar';
import { Footer } from './components/Footer';

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
        <Header />
        {/* Sidebar só aparece no mobile */}
        <Sidebar />
        <main className="min-h-screen bg-neutral text-text dark:bg-neutral dark:text-text transition-all duration-300">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
