"use client";

import { Artwork, Category } from "@/types";
import ArtworkGrid from "./ArtworkGrid";

interface CategoryItensProps {
  categories: Category[];
  artworks: Artwork[];
  artistSlug: string;
  selectedCategory: string;
}

const ArtworkCategory = ({
  categories,
  artworks,
  selectedCategory,
}: CategoryItensProps) => {
  if (selectedCategory === "all") {
    return (
      <section className="space-y-12">
        {categories.map((category) => {
          const categoryArtworks = artworks.filter(
            (art) => art.categoryId === category.id
          );
          return (
            <ArtworkGrid
              key={category.id}
              title={category.name}
              artworks={categoryArtworks}
            />
          );
        })}
      </section>
    );
  }

  const filteredArtworks = artworks.filter(
    (art) => art.categoryId === selectedCategory
  );

  return (
    <section className="space-y-12">
      {filteredArtworks.length > 0 ? (
        <ArtworkGrid
          title={
            categories.find((c) => c.id === selectedCategory)?.name ||
            "Categoria"
          }
          artworks={filteredArtworks}
        />
      ) : (
        <ArtworkGrid
          title="Todas as Obras"
          artworks={artworks.filter((art) => art.toSell)}
        />
      )}
    </section>
  );
};

export default ArtworkCategory;
