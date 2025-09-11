"use client";

import { useEffect } from "react";
import { useArtistStore } from "@/store/artistStore";
import { getArtistBySlug } from "@/services/artistService";

export function useArtistData(slug: string) {
  const artist = useArtistStore((s) => s.artist);
  const loading = useArtistStore((s) => s.loading);
  const error = useArtistStore((s) => s.error);
  const setArtist = useArtistStore((s) => s.setArtist);
  const setLoading = useArtistStore((s) => s.setLoading);
  const setError = useArtistStore((s) => s.setError);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);

    getArtistBySlug(slug)
      .then(setArtist)
      .catch(() => setError("Não foi possível carregar os dados do artista."))
      .finally(() => setLoading(false));
  }, [slug]);

  return { artist, loading, error };
}
