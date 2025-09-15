"use client";

import { useEffect, useState } from "react";
import { useArtistStore } from "@/store/artistStore";
import { getArtistBySlug } from "@/services/artistService";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";

const ArtistStorePage = () => {
  const { artist, slug, setArtist, setLoading, loading, setError } =
    useArtistStore();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedArt, setSelectedArt] = useState<any | null>(null); // obra selecionada
  const [quantity, setQuantity] = useState(1); // quantidade
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
          // só exibe categorias que tenham pelo menos uma obra à venda
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
          {filteredArtworks.map((art) => (
            <div
              key={art.id}
              className="rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800"
            >
              <button
                onClick={() => {
                  setSelectedArt(art);
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
                  {!art.isSold && art.toSell && (
                    <button
                      onClick={() => {
                        setSelectedArt(art);
                        setQuantity(1);
                      }}
                      className="px-4 py-2 rounded-lg bg-secondary text-white hover:opacity-90 transition"
                    >
                      Ver mais
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
              src={selectedArt.imageUrl}
              alt={selectedArt.title}
              width={500}
              height={400}
              className="w-full max-h-[400px] object-contain rounded-lg mb-4 bg-gray-100"
            />

            {/* Informações */}
            <h2 className="text-2xl font-bold mb-1">{selectedArt.title}</h2>
            <p className="text-sm text-gray-400 mb-2">
              {
                artist.categories.find((c) => c.id === selectedArt.categoryId)
                  ?.name
              }
            </p>

            <p className="text-xl font-semibold text-primary mb-4">
              {selectedArt.price
                ? `R$ ${selectedArt.price.toFixed(2)}`
                : "Sob consulta"}
            </p>

            {/* Quantidade e Ações (só se estiver à venda e não vendida) */}
            {selectedArt.toSell && !selectedArt.isSold ? (
              <>
                {/* Quantidade */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-medium">Quantidade:</span>
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min={1}
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="w-16 text-center border-l border-r dark:bg-gray-800"
                    />
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-3 py-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Ações */}
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setSelectedArt(null)}
                    className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      for (let i = 0; i < quantity; i++) {
                        addToCart({
                          id: selectedArt.id,
                          title: selectedArt.title,
                          imageUrl: selectedArt.imageUrl,
                          price: selectedArt.price,
                        });
                      }
                      setSelectedArt(null);
                    }}
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 shadow-md"
                  >
                    Adicionar
                  </button>
                </div>
              </>
            ) : (
              <p className="text-red-500 font-medium mt-4">
                Esta obra não está disponível para venda.
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default ArtistStorePage;
