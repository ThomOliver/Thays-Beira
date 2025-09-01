"use client";

import { useArtistStore } from "@/store/artistStore";
import { useArtistData } from "@/hooks/useArtistData";
import { PageState } from "../components/PageStateProps";
import { CategoryItens } from "../components/CategoryItem";

const ArtistPortfolioPage = () => {
  const { slug } = useArtistStore();
  const { artist, loading, error } = useArtistData(slug);

  if (loading) return <PageState type="loading" message="Carregando..." />;
  if (error || !artist) return <PageState type="error" message="Artista não encontrado." />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-0">
      {artist.categories && artist.artworks && (
        <CategoryItens
          categories={artist.categories}
          artworks={artist.artworks}
          artistSlug={slug}
        />
      )}
    </div>
  );
};

export default ArtistPortfolioPage;
