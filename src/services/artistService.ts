import { Artist, PublicSlug } from '@/types';

// Função para buscar um artista pelo slug
export const getArtistBySlug = async (slug: string): Promise<Artist> => {
  try {
    // Substitua 'sua-api.com' pelo seu domínio real
    const response = await fetch(`http://localhost:3000/users/public/${slug}`);
    if (!response.ok) {
      throw new Error('Erro ao buscar o artista.');
    }
    return response.json();
  } catch (error) {
    console.error('Falha na requisição:', error);
    throw error;
  }
};

// Função para buscar todos os slugs públicos
export const getPublicSlugs = async (): Promise<PublicSlug[]> => {
  try {
    // Substitua 'sua-api.com' pelo seu domínio real
    const response = await fetch(`http://localhost:3000/users/public-slugs`);
    if (!response.ok) {
      throw new Error('Erro ao buscar os slugs públicos.');
    }
    return response.json();
  } catch (error) {
    console.error('Falha na requisição dos slugs:', error);
    throw error;
  }
};