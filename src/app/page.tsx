'use client';

import dynamic from 'next/dynamic';
import { useArtistStore } from '@/store/artistStore';
import { useArtistData } from '@/hooks/useArtistData';
import { PageState } from './components/PageStateProps';
import React from 'react';

// Dynamic import do HeroSlider (sem SSR)
const HeroSlider = dynamic(() => import('@/app/components/HeroSlider'), {
  ssr: false,
  loading: () => <div className="h-[500px] flex items-center justify-center">Carregando slider...</div>
});

// Os outros também podem ser lazy carregados
const ArtistAbout = dynamic(() => import('@/app/components/ArtistAbout'));
const CategoryItens = dynamic(() => import('@/app/components/CategoryItem'));
const MemoCategoryItens = React.memo(CategoryItens);

const ArtistPortfolioPage = () => {
  const slug = useArtistStore(state => state.slug); // selector para evitar re-render global
  const { artist, loading, error } = useArtistData(slug);

  if (loading) return <PageState type="loading" message="Carregando..." />;
  if (error || !artist) return <PageState type="error" message="Artista não encontrado." />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <HeroSlider artworks={artist.artworks || []} />
      <ArtistAbout artist={artist} />

      {artist.categories && artist.artworks && (
        <MemoCategoryItens
          categories={artist.categories}
          artworks={artist.artworks}
          artistSlug={slug}
        />
      )}
    </div>
  );
};

export default ArtistPortfolioPage;
