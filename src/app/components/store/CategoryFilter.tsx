"use client";

import React from "react";
import { Category, Artwork } from "@/types";

interface CategoryFilterProps {
  categories: Category[];
  artworks: Artwork[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  showAllCategories?: boolean;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  artworks,
  selectedCategory,
  onSelectCategory,
  showAllCategories = false,
}) => {
  const availableCategories = showAllCategories
    ? categories
    : categories.filter((category) =>
        artworks.some((art) => art.categoryId === category.id && art.toSell)
      );

  return (
    <div className="flex gap-3 mb-8 flex-wrap mt-16">
      <button
        onClick={() => onSelectCategory("all")}
        className={`px-4 py-2 rounded-lg ${
          selectedCategory === "all"
            ? "bg-primary text-white"
            : "bg-gray-200 dark:bg-gray-700"
        }`}
      >
        Todas
      </button>

      {availableCategories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className={`px-4 py-2 rounded-lg ${
            selectedCategory === category.id
              ? "bg-primary text-white"
              : "bg-gray-200 dark:bg-gray-700"
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
