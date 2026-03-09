import { getArtworksByCategory } from "@/lib/artworks";
import GalleryPage from "@/components/GalleryPage";

export const metadata = {
  title: "Sculptures | Tiffany Chen Art",
  description: "Portrait busts and sculptural works by Tiffany Chen (陳嬋娟).",
};

export default function SculpturesPage() {
  const artworks = getArtworksByCategory("sculptures");
  return <GalleryPage titleKey="sculpturesTitle" artworks={artworks} />;
}
