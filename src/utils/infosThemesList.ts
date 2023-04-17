// Types
import { Filters } from "../types/randomInfo";

export function getInfosThemesList<K extends keyof Filters>(filter: Filters, list: K[]) {
  return list.map((item) => {
    return { type: item, filter: filter[item] };
  });
}
