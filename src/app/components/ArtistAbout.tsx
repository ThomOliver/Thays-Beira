"use client";

import { Artist } from "@/types";
import Image from "next/image";

export const ArtistAbout = ({ artist }: { artist: Artist }) => {
  return (
    <header className="flex flex-col lg:flex-row items-center lg:items-start gap-8 p-8 bg-white dark:bg-bg">
      <div className="flex-shrink-0 w-48 h-48 lg:w-1/2 lg:h-auto mt-8">
        <Image
          src={artist.profilePic || "https://placehold.co/800x1000"}
          alt={artist.name}
          width={800}
          height={1000}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          className="w-full h-full object-cover shadow-lg rounded-full lg:rounded-none"
          priority
          unoptimized
        />
      </div>

      <div className="lg:w-1/2 text-center lg:text-left p-8">
        <h1 className="text-5xl font-extrabold mb-4">Sobre {artist.name}</h1>
        <p className="text-xl leading-relaxed">{artist.bio}</p>
      </div>
    </header>
  );
};

export default ArtistAbout;