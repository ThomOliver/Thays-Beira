import { Artist, PublicSlug } from "@/types";

export const getArtistBySlug = async (slug: string): Promise<Artist> => {
  const response = await fetch(
    `https://backend-portifolio-564e.onrender.com/users/public/${slug}`
  );
  if (!response.ok) {
    throw new Error("Erro ao buscar o artista.");
  }
  return response.json();
};
