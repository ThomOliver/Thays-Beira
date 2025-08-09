"use client"

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useArtistStore } from '@/store/artistStore';
import { getArtistBySlug } from '@/services/artistService';
import { Artist, Artwork, Exhibition } from '@/types';

// Componente para exibir as obras de arte
const ArtworksSection = ({ artworks }: { artworks: Artwork[] }) => (
  <section className="my-8">
    <h2 className="text-3xl font-bold mb-4">Obras de Destaque</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {artworks.map((artwork) => (
        <div key={artwork.id} className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <img
            src={artwork.imageUrl}
            alt={artwork.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold">{artwork.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-1">{artwork.description}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

// Componente para exibir as exposições
const ExhibitionsSection = ({ exhibitions }: { exhibitions: Exhibition[] }) => (
  <section className="my-8">
    <h2 className="text-3xl font-bold mb-4">Exposições</h2>
    <ul className="space-y-4">
      {exhibitions.map((exhibition) => (
        <li key={exhibition.id} className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">{exhibition.title}</h3>
          <p className="text-gray-600 dark:text-gray-400">
            {new Date(exhibition.date).toLocaleDateString()} - {exhibition.location}
          </p>
        </li>
      ))}
    </ul>
  </section>
);

// Página principal do portfólio
const ArtistPortfolioPage = () => {
  const { slug } = useParams();
  const { artist, setArtist, setLoading, loading, setError } = useArtistStore();

  useEffect(() => {
    if (slug) {
      setLoading(true);
      getArtistBySlug(slug as string)
        .then((data) => {
          setArtist(data);
        })
        .catch((err) => {
          console.error(err);
          setError('Não foi possível carregar os dados do artista.');
        })
        .finally(() => {
          setLoading(false);
        });
    }
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8">
      <header className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
        <img
          src={artist.profilePic || 'https://placehold.co/200x200'}
          alt={artist.name}
          className="w-48 h-48 rounded-full object-cover shadow-lg"
        />
        <div className="text-center md:text-left">
          <h1 className="text-5xl font-extrabold">{artist.name}</h1>
          <p className="text-xl mt-4 max-w-2xl">{artist.bio}</p>
        </div>
      </header>

      {artist.artworks && artist.artworks.length > 0 && (
        <ArtworksSection artworks={artist.artworks} />
      )}

      {artist.exhibitions && artist.exhibitions.length > 0 && (
        <ExhibitionsSection exhibitions={artist.exhibitions} />
      )}
    </div>
  );
};

export default ArtistPortfolioPage;
