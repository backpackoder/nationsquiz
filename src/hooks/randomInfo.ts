import { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppContext";

// Types
import { AppProviderProps } from "../types/context";
import { Filters, FiltersKeys, InfosList, RandomInfo } from "../types/randomInfo";

// Utils
import { getInfosFilters } from "../utils/infosFilters";
import { getFormattedNumber } from "../utils/formattedNumber";
import { sumNumbers } from "../utils/sumNumbers";
import { percentage } from "../utils/percentage";

export function useGetRandomInfo(next: number) {
  const { actualLanguage, data }: AppProviderProps = useContext(AppContext);

  // const filter = data?.filter((item) => (item.borders?.length > 0 ? item.borders?.length : null));
  // console.log("filter", filter);

  // const map = filter?.map((item) => item.borders?.length);
  // console.log("map", map);

  // const largestNumber = Math.max(...map!);
  // console.log("largestNumber", largestNumber);

  // const howMany = filter?.filter((item) => item.borders?.length === largestNumber);
  // console.log("howMany", howMany?.length);

  const randomInfo = getRandomInfo();
  const [info, setInfo] = useState(randomInfo);

  function getInfosThemesList(filter: Filters, list: FiltersKeys[]) {
    return list.map((item) => {
      return { type: item, filter: filter[item] };
    });
  }

  function getRandomInfo() {
    const filters = data && getInfosFilters(data);

    const infosList: InfosList =
      filters &&
      getInfosThemesList(filters, [
        "capital",
        "population_country",
        "population_country_biggest",
        "population_continent",
        "area_biggest",
        "independent",
      ]);

    const randomInfo: RandomInfo =
      infosList && infosList[Math.floor(Math.random() * infosList.length)];

    const randomCountryFromInfo =
      randomInfo?.filter && randomInfo.filter[Math.floor(Math.random() * randomInfo.filter.length)];

    const sentenceInfo = {
      country: randomCountryFromInfo?.name.common ?? "No country name",
      countries: data?.length ?? 250,
      capital: randomCountryFromInfo?.capital ? randomCountryFromInfo?.capital[0] : "No capital",
      continent: randomCountryFromInfo?.region ?? "No region",
      population: getFormattedNumber({
        number: randomCountryFromInfo?.population ?? -50,
        language: actualLanguage,
      }),
      population_continent: getFormattedNumber({
        number: sumNumbers(filters?.population_continent, "population"),
        language: actualLanguage,
      }),
      population_continent_calc: Math.round(
        percentage(
          sumNumbers(filters?.population_continent, "population"),
          sumNumbers(data, "population")
        )
      ),
      area_biggest: getFormattedNumber({
        number: randomCountryFromInfo?.area ?? -50,
        language: actualLanguage,
      }),
      independent: randomInfo?.filter?.length ?? 0,
      independent_calc: percentage(randomInfo?.filter?.length, data?.length),
    };

    return { randomInfo, randomCountryFromInfo, sentenceInfo };
  }

  useEffect(() => {
    const newInfo = getRandomInfo();
    setInfo(newInfo);
  }, [next]);

  return info;
}
