"use client";

import { useEffect } from "react";
import { useArtistStore } from "@/store/artistStore";
import { getArtistBySlug } from "@/services/artistService";

export function useArtist(slug: string) {
  const setArtist = useArtistStore((s) => s.setArtist);
  const clearArtist = useArtistStore((s) => s.clearArtist);
  const setLoading = useArtistStore((s) => s.setLoading);
  const setError = useArtistStore((s) => s.setError);

  useEffect(() => {
    if (!slug) return;
    const controller = new AbortController();

    clearArtist();
    setLoading(true);

    getArtistBySlug(slug)
      .then((data) => {
        if (!controller.signal.aborted) {
          setArtist(data);
        }
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setError("Não foi possível carregar o artista.");
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [slug, setArtist, clearArtist, setLoading, setError]);
}
