'use client';

import dynamic from 'next/dynamic';
import { useArtistStore } from '@/store/artistStore';
import { useArtistData } from '@/hooks/useArtistData';
import { PageState } from './components/PageStateProps';
import React from 'react';
import { motion } from 'framer-motion';

// Dynamic import do HeroSlider (sem SSR)
const HeroSlider = dynamic(() => import('@/app/components/HeroSlider'), {
  ssr: false,
  loading: () => <div className="h-[500px] flex items-center justify-center">Carregando slider...</div>
});

const ArtistAbout = dynamic(() => import('@/app/components/ArtistAbout'));
const CategoryItens = dynamic(() => import('@/app/components/CategoryItem'));
const MemoCategoryItens = React.memo(CategoryItens);

const fadeUp = {
  hidden: { opacity: 0, y: 50 }, // começa invisível e mais para baixo
  visible: { opacity: 1, y: 0 }  // aparece e sobe
};

const ArtistPortfolioPage = () => {
  const slug = useArtistStore(state => state.slug);
  const { artist, loading, error } = useArtistData(slug);

  if (loading) return <PageState type="loading" message="Carregando..." />;
  if (error || !artist) return <PageState type="error" message="Artista não encontrado." />;

  return (
    <div className="min-h-screen bg-bg dark:bg-bg text-text dark:text-text">
      {/* Slider sem animação */}
      <HeroSlider artworks={artist.artworks || []} />

      {/* Animação fade-up */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible" // só anima quando entra na tela
        viewport={{ once: true, amount: 0.2 }} // anima só uma vez
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <ArtistAbout artist={artist} />
      </motion.div>

      {artist.categories && artist.artworks && (
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <MemoCategoryItens
            categories={artist.categories}
            artworks={artist.artworks}
            artistSlug={slug}
          />
        </motion.div>
      )}
    </div>
  );
};

export default ArtistPortfolioPage;
