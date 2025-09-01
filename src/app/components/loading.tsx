"use client";

import { useEffect } from "react";
import { useArtistStore } from "@/store/artistStore";
import { getArtistBySlug } from "@/services/artistService";

const ArtistPortfolioPage = () => {
  const { artist, setArtist, setLoading, loading, setError, slug } = useArtistStore();

  useEffect(() => {
    setLoading(true);
    getArtistBySlug(slug)
      .then((data) => {
        setArtist(data);
      })
      .catch(() => {
        setError("Não foi possível carregar os dados do artista.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug, setArtist, setLoading, setError]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl animate-pulse">Carregando...</p>
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl text-red-500">Artista não encontrado.</p>
      </div>
    );
  }
};

export default ArtistPortfolioPage;
