'use client';

import { ReactNode } from 'react';
import StoreHeader from '../components/StoreHeader';

export default function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
        <StoreHeader /> {/* Header da store */}
        <main className="min-h-screen bg-bg text-text">
          {children}
        </main>
      </body>
    </html>
  );
}
