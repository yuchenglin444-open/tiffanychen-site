"use client";

import { useLanguage } from "./LanguageProvider";

const exhibitions = [
  { year: "2024", title: "花現心靈 — Solo Exhibition", titleZh: "花現心靈 — 個展" },
  { year: "2023", title: "走入花間 全新發現 — Non-typical Gouache Painting Solo Exhibition", titleZh: "走入花間 全新發現 — 非典型膠彩畫個展" },
  { year: "2022", title: "膠彩畫特展 — Gouache Painting Special Exhibition", titleZh: "膠彩畫特展" },
  { year: "2020", title: "偶發的藝術 — Digital Gallery Feature", titleZh: "偶發的藝術 — 數位藝廊專題" },
  { year: "2018", title: "International Art Exhibition — Taiwan & Japan", titleZh: "國際藝術展覽 — 台日交流展" },
  { year: "2015", title: "Green Water Painting Society Annual Exhibition", titleZh: "綠水畫會年度展覽" },
  { year: "2012", title: "Taiwan Gouache Painting Association Exhibition", titleZh: "台灣膠彩畫協會展覽" },
  { year: "2008", title: "Portrait Exhibition — The Art Students League of New York", titleZh: "肖像展 — 紐約藝術學生聯盟" },
  { year: "2003", title: "Cross-Cultural Art Exchange — North America Tour", titleZh: "跨文化藝術交流 — 北美巡迴展" },
  { year: "1999", title: "Farewell Exhibition — Kaohsiung, Taiwan", titleZh: "惜別展 — 台灣高雄" },
  { year: "1995", title: "Southern Taiwan Regional Art Exhibition — Award Winner", titleZh: "南台灣區域藝術展 — 得獎" },
  { year: "1990", title: "National Gouache Painting Competition — Recognition", titleZh: "全國膠彩畫競賽 — 獲獎" },
  { year: "1986", title: "First Solo Exhibition — Kaohsiung Cultural Center", titleZh: "首次個展 — 高雄文化中心" },
];

export default function AboutContent() {
  const { locale, t } = useLanguage();
  const isZh = locale === "zh";

  return (
    <main className="pt-28 pb-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <h1 className="text-sm font-medium uppercase tracking-[0.3em] text-gray-400 text-center">
          {t.about.pageTitle}
        </h1>
        <div className="mt-2 h-px w-12 bg-gray-300 mx-auto" />

        <div className="mt-12 space-y-8 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-2xl font-light text-gray-900 tracking-wide">
              {t.about.heading}
            </h2>
            <p className="mt-4">{t.about.bio1}</p>
            <p className="mt-4">{t.about.bio2}</p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-gray-900 tracking-wide">
              {t.about.membershipsTitle}
            </h2>
            <ul className="mt-4 space-y-2">
              {t.about.memberships.map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-medium text-gray-900 tracking-wide">
              {t.about.exhibitionsTitle}
            </h2>
            <ul className="mt-4 space-y-3">
              {exhibitions.map((ex, i) => (
                <li key={i} className="flex gap-4">
                  <span className="shrink-0 text-sm text-gray-400 w-12">
                    {ex.year}
                  </span>
                  <span>{isZh ? ex.titleZh : ex.title}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-medium text-gray-900 tracking-wide">
              {t.about.contactTitle}
            </h2>
            <div className="mt-4 space-y-2">
              <p>
                {t.about.emailLabel}{" "}
                <a
                  href="mailto:t59122@gmail.com"
                  className="text-gray-900 underline underline-offset-4 hover:text-gray-600 transition-colors"
                >
                  t59122@gmail.com
                </a>
              </p>
              <p>
                {t.about.facebookLabel}{" "}
                <a
                  href="https://www.facebook.com/%E9%99%B3%E5%AC%8B%E5%A8%9F-Tiffany-Chen-Art-105715897896836"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-900 underline underline-offset-4 hover:text-gray-600 transition-colors"
                >
                  {t.about.facebookText}
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
