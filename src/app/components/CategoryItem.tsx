"use client";

import { Artwork, Category } from "@/types";
import { CategoryCard } from "./CategoryCard";
import { useTranslation } from "react-i18next";


interface CategoryItensProps {
  categories: Category[];
  artworks: Artwork[];
  artistSlug: string;
}

 const CategoryItens = ({ categories, artworks }: CategoryItensProps) => {
  const { t } = useTranslation("common");
  return (
    <section className="p-6">
      <h2 className="text-3xl font-bold mb-4">{t("Categories")}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {categories.map((category) => {
          const artwork = artworks.find(
            (art) => art.categoryId === category.id && art.position === 1
          );

          return (
            <CategoryCard
              key={category.id}
              category={category}
              artwork={artwork}
            />
          );
        })}
      </div>
    </section>
  );
};
export default CategoryItens;