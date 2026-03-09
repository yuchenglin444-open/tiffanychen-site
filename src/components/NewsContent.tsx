"use client";

import Image from "next/image";
import Link from "next/link";
import { getNewsByYear } from "@/lib/news";
import { useLanguage } from "./LanguageProvider";

export default function NewsContent() {
  const { locale, t } = useLanguage();
  const isZh = locale === "zh";
  const newsByYear = getNewsByYear();
  const years = Object.keys(newsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <main className="pt-28 pb-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <h1 className="text-sm font-medium uppercase tracking-[0.3em] text-gray-400 text-center">
          {t.news.sectionTitle}
        </h1>
        <div className="mt-2 h-px w-12 bg-gray-300 mx-auto" />

        {years.map((year) => (
          <section key={year} className="mt-16 first:mt-12">
            <h2 className="text-2xl font-light text-gray-300 tracking-wide">
              {year}
            </h2>
            <ul className="mt-4 space-y-6">
              {newsByYear[year].map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/news/${item.slug}`}
                    className="group block overflow-hidden rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
                      <Image
                        src={item.image}
                        alt={isZh ? item.titleZh : item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 672px"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-baseline justify-between gap-4">
                        <p className="text-base font-medium text-gray-900 group-hover:text-gray-500 transition-colors">
                          {isZh ? item.titleZh : item.title}
                        </p>
                        <time className="shrink-0 text-sm text-gray-400">
                          {new Date(item.date).toLocaleDateString(
                            isZh ? "zh-TW" : "en-US",
                            { month: "short", day: "numeric" }
                          )}
                        </time>
                      </div>
                      <p className="mt-2 text-sm text-gray-400 line-clamp-2">
                        {isZh ? item.summaryZh : item.summary}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
