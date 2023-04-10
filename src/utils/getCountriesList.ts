// Types
import { Regions } from "../types/settings";

// Commons
import { THEMES } from "../commons/commons";

export type GetCountriesList = {
  data: any;
  theme: string | undefined;
  region: number;
};

export function getCountriesList({ data, theme, region }: GetCountriesList) {
  function getRegion() {
    switch (region) {
      case Regions.Africa:
        return data.filter((country: any) => country.region === "Africa");

      case Regions.Americas:
        return data.filter((country: any) => country.region === "Americas");

      case Regions.Asia:
        return data.filter((country: any) => country.region === "Asia");

      case Regions.Europe:
        return data.filter((country: any) => country.region === "Europe");

      case Regions.Oceania:
        return data.filter((country: any) => country.region === "Oceania");

      default:
        return data;
    }
  }

  switch (theme) {
    case THEMES.FLAGS:
      return getRegion().filter((country: any) => country.cca2 !== undefined);

    case THEMES.CAPITALS:
      return getRegion().filter((country: any) => country.capital !== undefined);

    case THEMES.DEMOGRAPHY:
      return getRegion().filter((country: any) => country.population !== undefined);

    default:
      throw new Error("Theme not found");
  }
}
