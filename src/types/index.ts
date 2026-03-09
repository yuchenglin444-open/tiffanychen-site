export interface Artwork {
  title: string;
  titleZh: string;
  slug: string;
  image: string;
  category: "gouache" | "paintings" | "sculptures" | "others";
}

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  titleZh: string;
  date: string;
  year: number;
  summary: string;
  summaryZh: string;
  content: string;
  contentZh: string;
  image: string;
  images?: string[];
}
