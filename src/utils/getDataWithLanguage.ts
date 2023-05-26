import { API_DATA } from "../types/api";

export type GetDataDependingOnLanguage = {
  data: API_DATA;
  type: GetDataDependingOnLanguageType;
  language: string;
};

export type GetDataDependingOnLanguageType = "common name" | "official name";

export function getDataDependingOnLanguage({ data, type, language }: GetDataDependingOnLanguage) {
  const languageIsntEnglish = language === "fra" || language === "spa";

  switch (type) {
    case "common name":
      return languageIsntEnglish ? data.translations[language].common : data.name.common;

    case "official name":
      return languageIsntEnglish ? data.translations[language].official : data.name.official;

    default:
      throw new Error("Invalid data");
  }
}
