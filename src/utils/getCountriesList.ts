// Types
import { Regions } from "../types/settings";

// Commons
import { CONTINENTS, THEMES } from "../commons/commons";
import { API_DATA } from "../types/api";

export type GetCountriesList = {
  data: API_DATA[];
  theme: string | undefined;
  region: string;
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

      case THEMES.AREAS:
        return data.filter((country: API_DATA) => country.area !== undefined);

      default:
        throw new Error("Theme not found");
    }
  }

  switch (region) {
    case CONTINENTS.AFRICA:
      return getTheme().filter((country: API_DATA) => country.region === CONTINENTS.AFRICA);

    case CONTINENTS.AMERICAS:
      return getTheme().filter((country: API_DATA) => country.region === CONTINENTS.AMERICAS);

    case CONTINENTS.ASIA:
      return getTheme().filter((country: API_DATA) => country.region === CONTINENTS.ASIA);

    case CONTINENTS.EUROPE:
      return getTheme().filter((country: API_DATA) => country.region === CONTINENTS.EUROPE);

    case CONTINENTS.OCEANIA:
      return getTheme().filter((country: API_DATA) => country.region === CONTINENTS.OCEANIA);

    default:
      return getTheme();
  }
}
