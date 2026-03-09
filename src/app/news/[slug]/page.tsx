import { notFound } from "next/navigation";
import { newsItems, getNewsBySlug, getAdjacentNews } from "@/lib/news";
import NewsDetailContent from "@/components/NewsDetailContent";

export function generateStaticParams() {
  return newsItems.map((item) => ({ slug: item.slug }));
}

export function generateMetadata() {
  return {
    title: "News | Tiffany Chen Art",
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getNewsBySlug(slug);

  if (!article) {
    notFound();
  }

  const { prev, next } = getAdjacentNews(slug);

  return <NewsDetailContent article={article} prev={prev} next={next} />;
}
