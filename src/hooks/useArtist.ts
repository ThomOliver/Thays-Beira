'use client';

import { useEffect } from 'react';
import { useArtistStore } from '@/store/artistStore';

export function useArtist(slug: string) {
  const { setArtist, clearArtist } = useArtistStore();

  useEffect(() => {
    clearArtist();

    async function fetchArtist() {
      try {
        const res = await fetch(`/users/public/samoth-tec`);
        if (!res.ok) throw new Error('Artista não encontrado');
        const data = await res.json();
        setArtist(data);
      } catch {
        setArtist(null);
      }
    }

    fetchArtist();
  }, [slug, setArtist, clearArtist]);
}
