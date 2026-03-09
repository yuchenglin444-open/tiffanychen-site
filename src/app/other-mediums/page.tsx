import { getArtworksByCategory } from "@/lib/artworks";
import GalleryPage from "@/components/GalleryPage";

export const metadata = {
  title: "Other Mediums | Tiffany Chen Art",
  description: "Mixed media works including ceramics, glass fusion, and crafts by Tiffany Chen (陳嬋娟).",
};

export default function OtherMediumsPage() {
  const artworks = getArtworksByCategory("others");
  return <GalleryPage titleKey="othersTitle" artworks={artworks} />;
}
