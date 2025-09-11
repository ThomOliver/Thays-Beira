import { create } from "zustand";
import { Artist } from "@/types";

interface ArtistState {
  artist: Artist | null;
  slug: string;
  loading: boolean;
  error: string | null;
  setArtist: (artist: Artist | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearArtist: () => void;
}

export const useArtistStore = create<ArtistState>((set) => ({
  artist: null,
  slug: "thays-beira",
  loading: false,
  error: null,

  setArtist: (artist) => set({ artist, error: null }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error, loading: false }),
  clearArtist: () => set({ artist: null, error: null }),
}));
