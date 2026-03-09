"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useLanguage } from "./LanguageProvider";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { locale, setLocale, t } = useLanguage();

  const useDarkText = !isHome || scrolled;

  const navLinks = [
    { href: "/gouache-painting", label: t.nav.gouache },
    { href: "/paintings", label: t.nav.paintings },
    { href: "/sculptures", label: t.nav.sculptures },
    { href: "/other-mediums", label: t.nav.others },
    { href: "/news", label: t.nav.news },
    { href: "/about", label: t.nav.about },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleLocale = () => {
    setLocale(locale === "en" ? "zh" : "en");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        useDarkText
          ? "bg-white/95 backdrop-blur-sm shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col">
            <span
              className={`text-lg font-light tracking-widest transition-colors ${
                useDarkText ? "text-gray-900" : "text-white"
              }`}
            >
              Tiffany Chen
            </span>
            <span
              className={`text-xs tracking-wider transition-colors ${
                useDarkText ? "text-gray-500" : "text-white/80"
              }`}
            >
              陳嬋娟
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm tracking-wide transition-colors hover:opacity-70 ${
                  useDarkText ? "text-gray-700" : "text-white/90"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={toggleLocale}
              className={`text-xs tracking-wide border rounded px-2 py-1 transition-colors ${
                useDarkText
                  ? "border-gray-300 text-gray-500 hover:text-gray-900 hover:border-gray-900"
                  : "border-white/40 text-white/70 hover:text-white hover:border-white"
              }`}
              aria-label="Toggle language"
            >
              {locale === "en" ? "中文" : "EN"}
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5"
            aria-label="Toggle menu"
          >
            <span
              className={`block h-px w-6 transition-all ${
                useDarkText ? "bg-gray-900" : "bg-white"
              } ${menuOpen ? "translate-y-[3.5px] rotate-45" : ""}`}
            />
            <span
              className={`block h-px w-6 transition-all ${
                useDarkText ? "bg-gray-900" : "bg-white"
              } ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-px w-6 transition-all ${
                useDarkText ? "bg-gray-900" : "bg-white"
              } ${menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-100">
          <div className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm text-gray-700 tracking-wide"
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={toggleLocale}
              className="text-xs tracking-wide border border-gray-300 text-gray-500 hover:text-gray-900 hover:border-gray-900 rounded px-2 py-1 self-start transition-colors"
              aria-label="Toggle language"
            >
              {locale === "en" ? "中文" : "EN"}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
