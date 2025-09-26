"use client";

import { Artwork, Category } from "@/types";
import ArtworkGrid from "./ArtworkGrid";
import { getFieldByLang } from "@/utils/i18n";
import { useTranslation } from "react-i18next";

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
  const { i18n } = useTranslation(); 
  const { t } = useTranslation("common");

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
              title={getFieldByLang(category, "name", i18n.language)} 
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
            getFieldByLang(
              categories.find((c) => c.id === selectedCategory),
              "name",
              i18n.language
            ) || "Categoria"
          }
          artworks={filteredArtworks}
        />
      ) : (
        <ArtworkGrid
          title={t("AllWorks")}
          artworks={artworks.filter((art) => art.toSell)}
        />
      )}
    </section>
  );
};

export default ArtworkCategory;
