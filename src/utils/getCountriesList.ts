// Types
import { Regions } from "../types/settings";

// Commons
import { THEMES } from "../commons/commons";
import { API_DATA } from "../types/api";

export type GetCountriesList = {
  data: API_DATA[];
  theme: string | undefined;
  region: number;
};

export function getCountriesList({ data, theme, region }: GetCountriesList) {
  function getTheme(): API_DATA[] {
    switch (theme) {
      case THEMES.FLAGS:
        return data.filter((country: API_DATA) => country.cca2 !== undefined);

      case THEMES.CAPITALS:
        return data.filter((country: API_DATA) => country.capital !== undefined);

      case THEMES.DEMOGRAPHY:
        return data.filter((country: API_DATA) => country.population !== undefined);

      case THEMES.BORDERS:
        return data.filter((country: API_DATA) => country.borders !== undefined);

      default:
        throw new Error("Theme not found");
    }
  }

  switch (region) {
    case Regions.Africa:
      return getTheme().filter((country: API_DATA) => country.region === "Africa");

    case Regions.Americas:
      return getTheme().filter((country: API_DATA) => country.region === "Americas");

    case Regions.Asia:
      return getTheme().filter((country: API_DATA) => country.region === "Asia");

    case Regions.Europe:
      return getTheme().filter((country: API_DATA) => country.region === "Europe");

    case Regions.Oceania:
      return getTheme().filter((country: API_DATA) => country.region === "Oceania");

    default:
      return getTheme();
  }
}
