// Types
import { API_DATA } from "../types/api";

export function sumNumbers<K extends keyof API_DATA>(data: API_DATA[] | undefined, property: K) {
  const filteredData = data?.filter((item) => typeof item[property] === "number");
  const mappedData = filteredData?.map((item) => item[property]);

  const sum = mappedData?.reduce((acc, item) => {
    if (typeof item === "number") {
      acc += item;
    }
    return acc;
  }, 0);

  return sum ?? 0;
}
