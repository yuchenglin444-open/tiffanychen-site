import { getArtworksByCategory } from "@/lib/artworks";
import GalleryPage from "@/components/GalleryPage";

export const metadata = {
  title: "Gouache Painting | Tiffany Chen Art",
  description: "Eastern gouache paintings by Tiffany Chen (陳嬋娟), spanning over 39 years of artistic practice.",
};

export default function GouachePaintingPage() {
  const artworks = getArtworksByCategory("gouache");
  return <GalleryPage titleKey="gouacheTitle" artworks={artworks} />;
}
