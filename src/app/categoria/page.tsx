"use client";

import { useEffect } from "react";
import { useArtistStore } from "@/store/artistStore";
import { getArtistBySlug } from "@/services/artistService";
import { Artwork, Category } from "@/types";
import Link from "next/link";
import Image from "next/image";

const CategoriesSection = ({
  categories,
  artworks
}: {
  categories: Category[];
  artworks: Artwork[];
  artistSlug: string;
}) => {
  return (
    <section className="p-6 bg-bg dark:bg-bg text-text dark:text-text">
      <h2 className="text-3xl font-bold mb-4">Categorias</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {categories.map((category) => {
          const artwork = artworks.find(
            (art) => art.categoryId === category.id && art.position === 1
          );

          return (
            <Link
              key={category.id}
              href={`/categoria/${encodeURIComponent(category.id)}`}
            >
              <div className="relative rounded-lg overflow-hidden shadow-lg group cursor-pointer">
                {artwork ? (
                  <>
                    <Image
                      src={artwork.imageUrl}
                      alt={artwork.title}
                      width={400}
                      height={320}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
        })}
      </div>
    </section>
  );
};

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

  return (
    <div className="min-h-screen bg-bg dark:bg-bg text-text dark:text-text p-0">

      {artist.categories && artist.artworks && (
        <CategoriesSection
          categories={artist.categories}
          artworks={artist.artworks}
          artistSlug={slug}
        />
      )}
    </div>
  );
};

export default ArtistPortfolioPage;
