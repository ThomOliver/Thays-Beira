import { Artwork } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface ArtworkCardProps {
  art: Artwork;
}

const ArtworkCard = ({ art }: ArtworkCardProps) => (
  <Link
    key={art.id}
    href={`/artwork/${art.id}`}
    className="group rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
  >
    <Image
      src={art.imageUrl}
      alt={art.title}
      width={400}
      height={320}
      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
    <div className="p-4 bg-white dark:bg-gray-800">
      <h3 className="text-lg font-semibold">{art.title}</h3>
    </div>
  </Link>
);

export default ArtworkCard;