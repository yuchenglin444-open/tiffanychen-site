import { en } from "./en";
import { zh } from "./zh";
import { Locale, Dictionary } from "./types";

export type { Locale, Dictionary };

export function getDictionary(locale: Locale): Dictionary {
  return locale === "zh" ? zh : en;
}
