"use client";

import { Artwork, Category } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface CategoryItensProps {
  categories: Category[];
  artworks: Artwork[];
  artistSlug: string;
}

const ArtworkCategory = ({ categories, artworks }: CategoryItensProps) => {
  return (
    <section className="p-6 space-y-12">
      {categories.map((category) => {
        const categoryArtworks = artworks.filter(
          (art) => art.categoryId === category.id
        );

        if (categoryArtworks.length === 0) return null;

        return (
          <div className="mt-10" key={category.id}>
            <h2 className="text-2xl font-bold mb-6">{category.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {categoryArtworks.map((art) => (
                <Link
                key={art.id}
                href={`/obra/${art.id}`}
                className="group rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                <Image
                    src={art.imageUrl}
                    alt={art.title}
                    width={400}
                    height={320}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="p-4 bg-white dark:bg-gray-800">
                    <h3 className="text-lg font-semibold">{art.title}</h3>
                </div>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default ArtworkCategory;
