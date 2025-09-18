import Image from "next/image";
import Link from "next/link";

const ArtistLogo = ({ artist, isOnTop }: { artist: any; isOnTop: boolean }) => (
  <Link href="/" className="flex items-center gap-3 cursor-pointer group">
    <div className="relative">
      <Image
        src={artist?.profilePic || "https://placehold.co/40x40"}
        alt={artist?.name || "Artista"}
        width={50}
        height={50}
        unoptimized
        className="rounded-full object-cover ring-2 ring-transparent group-hover:ring-primary transition-all duration-300"
      />
    </div>
    <span
      className={`uppercase font-semibold text-lg tracking-wide transition-colors duration-300 ${
        isOnTop ? "text-white" : "text-gray-800 dark:text-gray-200"
      }`}
    >
      {artist?.name || "Carregando..."}
    </span>
  </Link>
);

export default ArtistLogo;