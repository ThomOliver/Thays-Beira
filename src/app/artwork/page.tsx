"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useArtistStore } from "@/store/artistStore";
import { useArtistData } from "@/hooks/useArtistData";
import { PageState } from "../components/PageStateProps";
import ArtworkCategory from "../components/ArtworkCategory";
import CategoryFilter from "../components/store/CategoryFilter";

const ArtistPortfolioPage = () => {
  const { slug } = useArtistStore();
  const { artist, loading, error } = useArtistData(slug);

  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  if (loading) return <PageState type="loading" message="Carregando..." />;
  if (error || !artist)
    return <PageState type="error" message="Artista não encontrado." />;

  return (
    <div className="min-h-screen bg-bg dark:bg-bg text-text dark:text-text p-6">
      {artist.categories && artist.artworks && (
        <>
          <CategoryFilter
            categories={artist.categories}
            artworks={artist.artworks}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            showAllCategories={true}
          />

          <ArtworkCategory
            categories={artist.categories}
            artworks={artist.artworks}
            artistSlug={slug}
            selectedCategory={selectedCategory}
          />
        </>
      )}
    </div>
  );
};

export default ArtistPortfolioPage;
