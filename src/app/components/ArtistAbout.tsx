"use client";

import { Artist } from "@/types";

export const ArtistAbout = ({ artist }: { artist: Artist }) => {
  return (
    <header className="flex flex-col lg:flex-row items-center lg:items-start gap-8 p-8 bg-white dark:bg-gray-900">
      <div className="flex-shrink-0 w-48 h-48 lg:w-1/2 lg:h-auto mt-8">
        <img
          src={artist.profilePic || "https://placehold.co/800x1000"}
          alt={artist.name}
          className="w-full h-full object-cover shadow-lg rounded-full lg:rounded-none"
        />
      </div>

      <div className="lg:w-1/2 text-center lg:text-left p-8">
        <h1 className="text-5xl font-extrabold mb-4">Sobre {artist.name}</h1>
        <p className="text-xl leading-relaxed">{artist.bio}</p>
      </div>
    </header>
  );
};
