"use client";

import { useState } from "react";
import { Artwork } from "@/types";
import { useLanguage } from "./LanguageProvider";
import ArtworkCard from "./ArtworkCard";
import Lightbox from "./Lightbox";

interface GalleryGridProps {
  artworks: Artwork[];
}

export default function GalleryGrid({ artworks }: GalleryGridProps) {
  const [selected, setSelected] = useState<Artwork | null>(null);
  const { locale } = useLanguage();

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {artworks.map((artwork) => (
          <ArtworkCard
            key={artwork.slug}
            artwork={artwork}
            onSelect={setSelected}
          />
        ))}
      </div>
      {selected && (
        <Lightbox
          src={selected.image}
          alt={locale === "zh" ? selected.titleZh : selected.title}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
