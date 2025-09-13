"use client";

import { useEffect, useState } from "react";
import { useArtistStore } from "@/store/artistStore";
import { getArtistBySlug } from "@/services/artistService";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

const ArtistStorePage = () => {
  const { artist, slug, setArtist, setLoading, loading, setError } = useArtistStore();
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    getArtistBySlug(slug)
      .then((data) => setArtist(data))
      .catch(() => setError("Não foi possível carregar os dados do artista."))
      .finally(() => setLoading(false));
  }, [slug, setArtist, setLoading, setError]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl animate-pulse">Carregando loja...</p>
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

  const filteredArtworks =
    selectedCategory === "all"
      ? artist.artworks
      : artist.artworks.filter((art) => art.categoryId === selectedCategory);

  return (
    <section className="p-6 min-h-screen bg-bg text-text">
      {/* Header do artista */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
        <Image
          src={artist.profilePic}
          alt={artist.name}
          width={120}
          height={120}
          className="rounded-full object-cover"
        />
        <div>
          <h1 className="text-4xl font-bold">{artist.name}</h1>
          <p className="mt-2 text-gray-600">{artist.bio}</p>

          {/* Redes sociais */}
          <div className="flex gap-4 mt-4">
            {artist.instagram && (
              <a
                href={artist.instagram}
                target="_blank"
                className="text-pink-500 hover:underline"
              >
                Instagram
              </a>
            )}
            {artist.tiktok && (
              <a
                href={artist.tiktok}
                target="_blank"
                className="text-black hover:underline"
              >
                TikTok
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Filtro de categorias */}
      <div className="flex gap-3 mb-8 flex-wrap">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-4 py-2 rounded-lg ${
            selectedCategory === "all"
              ? "bg-primary text-white"
              : "bg-gray-200 dark:bg-gray-700"
          }`}
        >
          Todas
        </button>
        {artist.categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
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

      {/* Obras */}
      {filteredArtworks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredArtworks.map((art) => (
            <div
              key={art.id}
              className="rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800"
            >
              <Link href={`/obra/${encodeURIComponent(art.id)}`}>
                <Image
                  src={art.imageUrl}
                  alt={art.title}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover"
                />
              </Link>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{art.title}</h3>
                <p className="text-sm text-gray-500 mb-4">
                  {
                    artist.categories.find((c) => c.id === art.categoryId)
                      ?.name
                  }
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-xl">
                    {art.isSold
                      ? "Vendido"
                      : art.price
                      ? `R$ ${art.price.toFixed(2)}`
                      : "Sob consulta"}
                  </span>
                  {!art.isSold && (
                    <button
                        onClick={() =>
                            useCartStore.getState().addToCart({
                            id: art.id,
                            title: art.title,
                            imageUrl: art.imageUrl,
                            price: art.price,
                            })
                        }
                        className="px-4 py-2 rounded-lg bg-secondary text-white hover:opacity-90 transition"
                    >
                        Adicionar
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Nenhuma obra encontrada nesta categoria.</p>
      )}
    </section>
  );
};

export default ArtistStorePage;
