"use client";

import Image from "next/image";
import Link from "next/link";
import { NewsItem } from "@/types";
import { useLanguage } from "./LanguageProvider";
import PageNavigation from "./PageNavigation";

interface NewsDetailContentProps {
  article: NewsItem;
  prev: NewsItem | null;
  next: NewsItem | null;
}

export default function NewsDetailContent({ article, prev, next }: NewsDetailContentProps) {
  const { locale, t } = useLanguage();
  const isZh = locale === "zh";

  const content = isZh ? article.contentZh : article.content;
  const paragraphs = content.split("\n\n").filter((p) => p.trim());

  return (
    <main className="pt-28 pb-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <Link
          href="/news"
          className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          {t.news.backToNews}
        </Link>

        <article className="mt-8">
          <time className="text-sm text-gray-400">
            {new Date(article.date).toLocaleDateString(
              isZh ? "zh-TW" : "en-US",
              { year: "numeric", month: "long", day: "numeric" }
            )}
          </time>
          <h1 className="mt-2 text-3xl font-light text-gray-900 tracking-wide">
            {isZh ? article.titleZh : article.title}
          </h1>
          <div className="mt-2 h-px w-12 bg-gray-300" />
          <div className="mt-8 overflow-hidden rounded-lg">
            <Image
              src={article.image}
              alt={isZh ? article.titleZh : article.title}
              width={1920}
              height={1440}
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="mt-8 space-y-6">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="text-lg leading-relaxed text-gray-600">
                {paragraph}
              </p>
            ))}
          </div>
          {article.images && article.images.length > 0 && (
            <div className="mt-12 space-y-6">
              {article.images.map((img, index) => (
                <div key={index} className="overflow-hidden rounded-lg">
                  <Image
                    src={img}
                    alt={`${isZh ? article.titleZh : article.title} - ${index + 1}`}
                    width={1200}
                    height={900}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </article>

        <PageNavigation
          prev={prev ? { href: `/news/${prev.slug}`, label: isZh ? prev.titleZh : prev.title } : null}
          next={next ? { href: `/news/${next.slug}`, label: isZh ? next.titleZh : next.title } : null}
        />
      </div>
    </main>
  );
}
