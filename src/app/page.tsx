"use client";

import Link from "next/link";
import { getLatestNews } from "@/lib/news";
import { useLanguage } from "@/components/LanguageProvider";

function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/images/hero.jpg)",
          backgroundColor: "#2c2c2c",
        }}
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
        <h1 className="text-6xl font-extralight tracking-[0.3em] sm:text-7xl md:text-8xl">
          Tiffany Chen
        </h1>
        <p className="mt-4 text-lg tracking-[0.5em] text-white/70 sm:text-xl">
          陳嬋娟
        </p>
      </div>
    </section>
  );
}

function AboutSection() {
  const { t } = useLanguage();

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
        <h2 className="text-sm font-medium uppercase tracking-[0.3em] text-gray-400">
          {t.about.sectionTitle}
        </h2>
        <div className="mt-2 h-px w-12 bg-gray-300 mx-auto" />
        <p className="mt-8 text-lg leading-relaxed text-gray-600">
          {t.about.bio}
        </p>
        <Link
          href="/about"
          className="mt-8 inline-block text-sm tracking-wide text-gray-900 underline underline-offset-4 hover:text-gray-600 transition-colors"
        >
          {t.about.readMore}
        </Link>
      </div>
    </section>
  );
}

function NewsSection() {
  const news = getLatestNews(5);
  const { locale, t } = useLanguage();

  return (
    <section className="bg-gray-50 py-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <h2 className="text-sm font-medium uppercase tracking-[0.3em] text-gray-400 text-center">
          {t.news.sectionTitle}
        </h2>
        <div className="mt-2 h-px w-12 bg-gray-300 mx-auto" />

        <ul className="mt-12 divide-y divide-gray-200">
          {news.map((item) => (
            <li key={item.id}>
              <Link
                href={`/news/${item.slug}`}
                className="flex items-baseline justify-between gap-4 py-5 group"
              >
                <div className="min-w-0">
                  <p className="text-base text-gray-900 group-hover:text-gray-500 transition-colors truncate">
                    {locale === "zh" ? item.titleZh : item.title}
                  </p>
                  <p className="mt-1 text-sm text-gray-400 line-clamp-1">
                    {locale === "zh" ? item.summaryZh : item.summary}
                  </p>
                </div>
                <time className="shrink-0 text-sm text-gray-400">
                  {new Date(item.date).toLocaleDateString(
                    locale === "zh" ? "zh-TW" : "en-US",
                    { year: "numeric", month: "short" }
                  )}
                </time>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8 text-center">
          <Link
            href="/news"
            className="text-sm tracking-wide text-gray-900 underline underline-offset-4 hover:text-gray-600 transition-colors"
          >
            {t.news.viewAll}
          </Link>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const { t } = useLanguage();

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
        <h2 className="text-sm font-medium uppercase tracking-[0.3em] text-gray-400">
          {t.contact.sectionTitle}
        </h2>
        <div className="mt-2 h-px w-12 bg-gray-300 mx-auto" />

        <div className="mt-10 flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-12">
          <a
            href="mailto:t59122@gmail.com"
            className="flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
            <span className="text-sm">{t.contact.email}</span>
          </a>

          <a
            href="https://www.facebook.com/%E9%99%B3%E5%AC%8B%E5%A8%9F-Tiffany-Chen-Art-105715897896836"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span className="text-sm">{t.contact.facebook}</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <NewsSection />
      <ContactSection />
    </main>
  );
}
