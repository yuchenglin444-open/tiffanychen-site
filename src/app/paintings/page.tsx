import { getArtworksByCategory } from "@/lib/artworks";
import GalleryPage from "@/components/GalleryPage";

export const metadata = {
  title: "Paintings | Tiffany Chen Art",
  description: "Oil paintings and portraits by Tiffany Chen (陳嬋娟).",
};

export default function PaintingsPage() {
  const artworks = getArtworksByCategory("paintings");
  return <GalleryPage titleKey="paintingsTitle" artworks={artworks} />;
}
