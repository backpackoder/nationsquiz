// Types
import { API_DATA } from "./api";

export type FiltersKeys =
  | "capital"
  | "population_country"
  | "population_country_biggest"
  | "population_continent"
  | "area_biggest"
  | "independent"
  | "unMember";

export type Filters = Record<FiltersKeys, API_DATA[]>;

export type RandomInfo = undefined | { type: FiltersKeys; filter: API_DATA[] | undefined };
export type InfosList = undefined | RandomInfo[];
