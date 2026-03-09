"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageProvider";

interface NavLink {
  href: string;
  label: string;
}

interface PageNavigationProps {
  prev?: NavLink | null;
  next?: NavLink | null;
}

export default function PageNavigation({ prev, next }: PageNavigationProps) {
  const { locale } = useLanguage();
  const isZh = locale === "zh";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="mt-16 flex items-center justify-between border-t border-gray-200 pt-8">
      <div>
        {prev && (
          <Link
            href={prev.href}
            className="group inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            <svg
              className="h-4 w-4 transition-transform group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
            <span className="max-w-[200px] truncate">{prev.label}</span>
          </Link>
        )}
      </div>

      <button
        onClick={scrollToTop}
        className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
        aria-label={isZh ? "回到頂部" : "Back to top"}
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
        </svg>
        {isZh ? "回到頂部" : "Back to Top"}
      </button>

      <div>
        {next && (
          <Link
            href={next.href}
            className="group inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            <span className="max-w-[200px] truncate">{next.label}</span>
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </Link>
        )}
      </div>
    </nav>
  );
}
