// Languages
export type Iso = "fra" | "en" | "spa";

export type LanguageBtn = {
  language: Iso;
  flag: JSX.Element;
}[];

// Themes
export type Themes = "flags" | "capitals" | "demography" | "borders" | "areas";
