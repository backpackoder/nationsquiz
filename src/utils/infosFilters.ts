// Types
import { API_DATA } from "../types/api";
import { Filters } from "../types/randomInfo";

// Utils
import { getRandomContinent } from "./getRandomContinent";

export function getInfosFilters(data: API_DATA[]) {
  const randomContinent = getRandomContinent();

  const filters: Filters = {
    capital: data?.filter((item) => item.capital !== undefined),

    population_country: data?.filter((item) => item.population !== undefined),

    population_country_biggest: [
      data[
        data
          .map((item) => item.population)
          .findIndex((pop) => pop === Math.max(...data.map((item) => item.population)))
      ],
    ],

    population_continent: data?.filter((item) => item.region === randomContinent),

    area_biggest: [
      data[
        data
          .map((item) => item.area)
          .findIndex((area) => area === Math.max(...data.map((item) => item.area)))
      ],
    ],

    independent: data?.filter((item) => item.independent === false),
  };

  return filters;
}
