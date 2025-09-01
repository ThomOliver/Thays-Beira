"use client";

import Link from "next/link";
import { Category, Artwork } from "@/types";

interface CategoryCardProps {
  category: Category;
  artwork?: Artwork;
}

export const CategoryCard = ({ category, artwork }: CategoryCardProps) => {
  return (
    <Link href={`/categoria/${encodeURIComponent(category.id)}`}>
      <div className="relative rounded-lg overflow-hidden shadow-lg group cursor-pointer">
        {artwork ? (
          <>
            <img
              src={artwork.imageUrl}
              alt={artwork.title}
              className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white p-4">
              <h3 className="text-xl font-semibold">{category.name}</h3>
              <p className="text-sm opacity-90">{artwork.title}</p>
            </div>
          </>
        ) : (
          <div className="w-full h-80 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
            <h3 className="text-xl font-semibold">{category.name}</h3>
          </div>
        )}
      </div>
    </Link>
  );
};
