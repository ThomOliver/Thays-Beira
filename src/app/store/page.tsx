"use client";

import { useEffect, useState } from "react";
import { useArtistStore } from "@/store/artistStore";
import { getArtistBySlug } from "@/services/artistService";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { Artwork } from "@/types";

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

  // Filtrar obras disponíveis para venda
  const filteredArtworks =
    selectedCategory === "all"
      ? artist.artworks.filter((art) => art.toSell)
      : artist.artworks.filter(
          (art) => art.categoryId === selectedCategory && art.toSell
        );

  // Garantir que a quantidade não vá abaixo de 1
  const handleQuantityChange = (value: number, max: number) => {
    if (value < 1) setQuantity(1);
    else if (value > max) setQuantity(max);
    else setQuantity(value);
  };

  return (
    <section className="p-6 min-h-screen bg-bg text-text">
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
        {artist.categories
          .filter((category) =>
            artist.artworks.some(
              (art) => art.categoryId === category.id && art.toSell
            )
          )
          .map((category) => (
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
          {filteredArtworks.flatMap((art) => {
            const items = [];

            // Card da obra original
            items.push(
              <div
                key={art.id + "-original"}
                className="rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800"
              >
                <button
                  onClick={() => {
                    setSelectedArt({ art, type: "original" });
                    setQuantity(1);
                  }}
                  className="w-full"
                >
                  <Image
                    src={art.imageUrl}
                    alt={art.title}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover"
                  />
                </button>
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
                    {!art.isSold && art.toSell && (art.amount ?? 0) > 0 ? (
                      <button
                        onClick={() => {
                          setSelectedArt({ art, type: "original" });
                          setQuantity(1);
                        }}
                        className="px-4 py-2 rounded-lg bg-secondary text-white hover:opacity-90 transition"
                      >
                        Ver mais
                      </button>
                    ) : (
                      <span className="px-4 py-2 rounded-lg bg-gray-300 text-gray-600 cursor-not-allowed">
                        Sem estoque
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );

            // Card do print
            if (art.isPrint && (art.amountPrint ?? 0) > 0) {
              items.push(
                <div
                  key={art.id + "-print"}
                  className="rounded-lg overflow-hidden shadow-lg bg-gray-50 dark:bg-gray-700 border border-dashed border-gray-400"
                >
                  <button
                    onClick={() => {
                      setSelectedArt({ art, type: "print" });
                      setQuantity(1);
                    }}
                    className="w-full"
                  >
                    <Image
                      src={art.imageUrl}
                      alt={`${art.title} (Print)`}
                      width={400}
                      height={300}
                      className="w-full h-64 object-cover opacity-90"
                    />
                  </button>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">
                      {art.title} <span className="text-xs">(Print)</span>
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Print •{" "}
                      {
                        artist.categories.find((c) => c.id === art.categoryId)
                          ?.name
                      }
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-xl text-blue-600">
                        R$ {art.pricePrint?.toFixed(2)}
                      </span>
                      <button
                        onClick={() => {
                          setSelectedArt({ art, type: "print" });
                          setQuantity(1);
                        }}
                        className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:opacity-90 transition"
                      >
                        Ver mais
                      </button>
                    </div>
                  </div>
                </div>
              );
            }

            return items;
          })}
        </div>
      ) : (
        <p>Nenhuma obra encontrada nesta categoria.</p>
      )}

      {/* Modal de Detalhes */}
      {selectedArt && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setSelectedArt(null)}
        >
          <div
            className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-lg w-full shadow-xl transform transition-all scale-100 animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botão Fechar */}
            <button
              onClick={() => setSelectedArt(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition"
            >
              ✖
            </button>

            {/* Imagem */}
            <Image
              src={selectedArt.art.imageUrl}
              alt={selectedArt.art.title}
              width={500}
              height={400}
              className="w-full max-h-[400px] object-contain rounded-lg mb-4 bg-gray-100"
            />

            {/* Informações */}
            <h2 className="text-2xl font-bold mb-1">
              {selectedArt.art.title}{" "}
              {selectedArt.type === "print" && (
                <span className="text-sm text-blue-600">(Print)</span>
              )}
            </h2>
            <p className="text-sm text-gray-400 mb-2">
              {
                artist.categories.find(
                  (c) => c.id === selectedArt.art.categoryId
                )?.name
              }
            </p>

            <p className="text-xl font-semibold text-primary mb-4">
              {selectedArt.type === "print"
                ? `R$ ${selectedArt.art.pricePrint?.toFixed(2)}`
                : selectedArt.art.price
                ? `R$ ${selectedArt.art.price.toFixed(2)}`
                : "Sob consulta"}
            </p>

            {/* Quantidade e Ações */}
            {(() => {
              const max =
                selectedArt.type === "print"
                  ? selectedArt.art.amountPrint ?? 0
                  : selectedArt.art.amount ?? 0;
              const isAvailable =
                selectedArt.type === "print"
                  ? (selectedArt.art.amountPrint ?? 0) > 0
                  : !selectedArt.art.isSold &&
                    selectedArt.art.toSell &&
                    (selectedArt.art.amount ?? 0) > 0;

              if (!isAvailable) {
                return (
                  <p className="text-red-500 font-medium mt-4">
                    Produto indisponível.
                  </p>
                );
              }

              return (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="font-medium">Quantidade:</span>
                    <div className="flex items-center border rounded-lg overflow-hidden">
                      <button
                        onClick={() =>
                          handleQuantityChange(quantity - 1, max)
                        }
                        disabled={quantity <= 1}
                        className="px-3 py-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 disabled:opacity-50"
                      >
                        −
                      </button>

                      <input
                        type="number"
                        min={1}
                        max={max}
                        value={quantity}
                        onChange={(e) =>
                          handleQuantityChange(Number(e.target.value), max)
                        }
                        className="w-16 text-center border-l border-r dark:bg-gray-800"
                      />
                      <button
                        onClick={() =>
                          handleQuantityChange(quantity + 1, max)
                        }
                        className="px-3 py-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-sm text-gray-500">Máx: {max}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => setSelectedArt(null)}
                      className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => {
                        addToCart({
                          id:
                            selectedArt.type === "print"
                              ? selectedArt.art.id + "-print"
                              : selectedArt.art.id,
                          title:
                            selectedArt.art.title +
                            (selectedArt.type === "print"
                              ? " (Print)"
                              : ""),
                          imageUrl: selectedArt.art.imageUrl,
                          price:
                            selectedArt.type === "print"
                              ? selectedArt.art.pricePrint
                              : selectedArt.art.price,
                        });
                        setSelectedArt(null);
                      }}
                      className="px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 shadow-md"
                    >
                      Adicionar
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </section>
  );
};

export default ArtistStorePage;
