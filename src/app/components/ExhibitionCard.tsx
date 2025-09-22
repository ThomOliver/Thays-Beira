"use client";

import Image from "next/image";
import Link from "next/link";

interface ExhibitionCardProps {
  ex: {
    id: string;
    title: string;
    description?: string | null; // ⬅️ agora aceita null
    imageUrl?: string | null;
    date: string;
  };
}

const ExhibitionCard = ({ ex }: ExhibitionCardProps) => (
  <Link
    href={`/exhibition/${ex.id}`}
    className="group rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-bg"
  >
    {ex.imageUrl && (
      <Image
        src={ex.imageUrl}
        alt={ex.title}
        width={400}
        height={320}
        className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    )}
    <div className="p-4 bg-white dark:bg-gray-800">
      <h3 className="text-lg font-semibold">{ex.title}</h3>
      {ex.description && (
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {ex.description}
        </p>
      )}
      <p className="text-xs mt-2 text-secondary">
        {new Date(ex.date).toLocaleDateString("pt-BR")}
      </p>
    </div>
  </Link>
);

export default ExhibitionCard;
