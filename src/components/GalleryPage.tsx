"use client";

import { Artwork } from "@/types";
import { useLanguage } from "./LanguageProvider";
import GalleryGrid from "./GalleryGrid";
import PageNavigation from "./PageNavigation";

const galleryOrder = [
  { key: "gouacheTitle" as const, href: "/gouache-painting" },
  { key: "paintingsTitle" as const, href: "/paintings" },
  { key: "sculpturesTitle" as const, href: "/sculptures" },
  { key: "othersTitle" as const, href: "/other-mediums" },
];

interface GalleryPageProps {
  titleKey: "gouacheTitle" | "paintingsTitle" | "sculpturesTitle" | "othersTitle";
  artworks: Artwork[];
}

export default function GalleryPage({ titleKey, artworks }: GalleryPageProps) {
  const { t } = useLanguage();

  const currentIndex = galleryOrder.findIndex((g) => g.key === titleKey);
  const prevGallery = currentIndex > 0 ? galleryOrder[currentIndex - 1] : null;
  const nextGallery = currentIndex < galleryOrder.length - 1 ? galleryOrder[currentIndex + 1] : null;

  return (
    <main className="pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h1 className="text-sm font-medium uppercase tracking-[0.3em] text-gray-400 text-center">
          {t.gallery[titleKey]}
        </h1>
        <div className="mt-2 h-px w-12 bg-gray-300 mx-auto" />
        <div className="mt-12">
          <GalleryGrid artworks={artworks} />
        </div>
        <PageNavigation
          prev={prevGallery ? { href: prevGallery.href, label: t.gallery[prevGallery.key] } : null}
          next={nextGallery ? { href: nextGallery.href, label: t.gallery[nextGallery.key] } : null}
        />
      </div>
    </main>
  );
}
