import Image from "next/image";
import Link from "next/link";
import { Artist } from "@/types"; // <-- importa o tipo

interface ArtistLogoProps {
  artist: Artist | null;
  isOnTop: boolean;
  className?: string;
  imgSize?: number;
}

const ArtistLogo = ({
  artist,
  isOnTop,
  className = "",
  imgSize = 50,
}: ArtistLogoProps) => (
  <Link
    href="/"
    className={`flex items-center gap-3 cursor-pointer group ${className}`}
  >
    <div className="relative">
      <Image
        src={artist?.profilePic || "https://placehold.co/40x40"}
        alt={artist?.name || "Artista"}
        width={imgSize}
        height={imgSize}
        unoptimized
        className="rounded-full object-cover ring-2 ring-transparent group-hover:ring-primary transition-all duration-300"
      />
    </div>
    <span
      className={`uppercase font-semibold text-lg tracking-wide transition-colors duration-300 truncate ${
        isOnTop ? "text-white" : "text-gray-800 dark:text-gray-200"
      }`}
    >
      {artist?.name || "Carregando..."}
    </span>
  </Link>
);

export default ArtistLogo;
