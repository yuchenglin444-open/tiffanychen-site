"use client";

import Image from "next/image";
import { Artwork } from "@/types";
import { useLanguage } from "./LanguageProvider";

interface ArtworkCardProps {
  artwork: Artwork;
  onSelect: (artwork: Artwork) => void;
}

export default function ArtworkCard({ artwork, onSelect }: ArtworkCardProps) {
  const { locale } = useLanguage();
  const displayTitle = locale === "zh" ? artwork.titleZh : artwork.title;

  return (
    <button
      onClick={() => onSelect(artwork)}
      className="group block w-full text-left focus:outline-none"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Image
          src={artwork.image}
          alt={displayTitle}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <p className="mt-2 text-sm text-gray-600 truncate">{displayTitle}</p>
    </button>
  );
}
