"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <Link href="/" className="text-white font-light tracking-widest">
            Tiffany Chen / 陳嬋娟
          </Link>
          <p className="text-sm">{t.footer.copyright}</p>
          <a
            href="#top"
            className="text-sm hover:text-white transition-colors"
          >
            {t.footer.backToTop}
          </a>
        </div>
      </div>
    </footer>
  );
}
