// Languages
export type Iso = "fra" | "en" | "spa";

export type LanguageBtn = {
  language: Iso;
  flag: JSX.Element;
}[];

// Themes
export type SettingsStrings = {
  settings: "theme" | "region" | "difficulty" | "length";
  themes: "flags" | "capitals" | "demography" | "borders" | "areas";
  difficulties: "kid" | "easy" | "medium" | "hard" | "expert";
  lengths: "short" | "normal" | "long";
  regions: "World" | "Africa" | "Americas" | "Antarctic" | "Asia" | "Europe" | "Oceania";
};
