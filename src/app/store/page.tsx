"use client";

import { useEffect, useState } from "react";
import { useArtistStore } from "@/store/artistStore";
import { getArtistBySlug } from "@/services/artistService";
import { useCartStore } from "@/store/cartStore";
import { Artwork } from "@/types";
import ArtModal from "../components/store/ArtModal";
import ArtworkCard from "../components/store/ArtworkCard";
import CategoryFilter from "../components/store/CategoryFilter";

const ArtistStorePage = () => {
  const { artist, slug, setArtist, setLoading, loading, setError } =
    useArtistStore();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedArt, setSelectedArt] = useState<{
    art: Artwork;
    type: "original" | "print";
  } | null>(null);
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((state) => state.addToCart);

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
      ? artist.artworks.filter((art) => art.toSell)
      : artist.artworks.filter(
          (art) => art.categoryId === selectedCategory && art.toSell
        );

  return (
    <section className="p-6 min-h-screen bg-bg text-text">

      <CategoryFilter
        categories={artist.categories}
        artworks={artist.artworks}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {filteredArtworks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredArtworks.flatMap((art) => {
            const items = [];
            const categoryName = artist.categories.find((c) => c.id === art.categoryId)?.name;

            items.push(
              <ArtworkCard
                key={art.id + "-original"}
                art={art}
                type="original"
                categoryName={categoryName}
                onSelect={() => {
                  setSelectedArt({ art, type: "original" });
                  setQuantity(1);
                }}
              />
            );

            if (art.isPrint && (art.amountPrint ?? 0) > 0) {
              items.push(
                <ArtworkCard
                  key={art.id + "-print"}
                  art={art}
                  type="print"
                  categoryName={categoryName}
                  onSelect={() => {
                    setSelectedArt({ art, type: "print" });
                    setQuantity(1);
                  }}
                />
              );
            }

            return items;
          })}
        </div>
      ) : (
        <p>Nenhuma obra encontrada nesta categoria.</p>
      )}

      {selectedArt && (

        <ArtModal
          selectedArt={selectedArt}
          onClose={() => setSelectedArt(null)}
          onAddToCart={addToCart}
        />

      )}
    </section>
  );
};

export default ArtistStorePage;
