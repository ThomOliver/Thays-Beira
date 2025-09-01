"use client";

import { useEffect } from "react";
import { useArtistStore } from "@/store/artistStore";
import { getArtistBySlug } from "@/services/artistService";

export const useArtistData = (slug: string) => {
  const { artist, setArtist, setLoading, loading, setError, error } = useArtistStore();

  useEffect(() => {
    setLoading(true);
    getArtistBySlug(slug)
      .then((data) => setArtist(data))
      .catch(() => setError("Não foi possível carregar os dados do artista."))
      .finally(() => setLoading(false));
  }, [slug, setArtist, setLoading, setError]);

  return { artist, loading, error };
};
