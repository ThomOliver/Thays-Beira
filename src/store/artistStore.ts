// src/store/artistStore.ts
import { create } from 'zustand';
import { Artist } from '@/types';

interface ArtistState {
  artist: Artist | null;
  loading: boolean;
  error: string | null;
  setArtist: (artist: Artist | null) => void; // aceita null
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearArtist: () => void; // adiciona clearArtist
}

export const useArtistStore = create<ArtistState>((set) => ({
  artist: null,
  loading: false,
  error: null,
  setArtist: (artist) => set({ artist, error: null }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error, loading: false, artist: null }),
  clearArtist: () => set({ artist: null, error: null }), // implementação
}));
