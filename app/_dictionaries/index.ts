import "server-only";
import ar from "./ar.json";
import en from "./en.json";

// One text file per language. Arabic is the default and lives at `/`;
// English lives at `/en`.
const dictionaries = { ar, en } satisfies Record<string, typeof ar>;

export type Locale = keyof typeof dictionaries;
export type Dictionary = typeof ar;

export const localeSettings: Record<Locale, { dir: "rtl" | "ltr"; home: string }> = {
  ar: { dir: "rtl", home: "/" },
  en: { dir: "ltr", home: "/en" },
};

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];
