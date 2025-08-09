"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getArtistBySlug } from "@/services/artistService";
import { Artwork, Category } from "@/types";
import Link from "next/link";

export default function CategoriaPage() {
  const { slug, categoryId } = useParams();
  const router = useRouter();

  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug || !categoryId) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const data = await getArtistBySlug(slug as string);

        const category = (data.categories as Category[]).find(
          (cat) => cat.id === categoryId
        );
        setCategoryName(category?.name?.trim() || "Categoria");

        const filteredArtworks = (data.artworks as Artwork[]).filter(
          (art) => art.categoryId === categoryId
        );

        setArtworks(filteredArtworks);
      } catch (error) {
        console.error("Erro ao carregar categoria:", error);
        setCategoryName("Categoria não encontrada");
        setArtworks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, categoryId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl animate-pulse">Carregando obras...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-20">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
        <h1 className="text-4xl font-extrabold">{categoryName}</h1>
        <button
          onClick={() => router.back()}
          className="mt-4 sm:mt-0 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          Voltar
        </button>
      </div>

      {/* Lista de obras */}
      {artworks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {artworks.map((art) => (
            <Link
              key={art.id}
              href={`/artista/${slug}/obra/${art.id}`}
              className="group rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={art.imageUrl}
                alt={art.title}
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4 bg-white dark:bg-gray-800">
                <h3 className="text-lg font-semibold">{art.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-lg text-center mt-20 opacity-75">
          Nenhuma obra encontrada nesta categoria.
        </p>
      )}

      {/* Link para voltar ao portfólio */}
      <div className="mt-12 text-center">
        <Link
          href={`/artista/${slug}`}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Ver todas as categorias
        </Link>
      </div>
    </div>
  );
}
