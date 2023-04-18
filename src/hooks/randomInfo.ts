import { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppContext";
import { useTranslation } from "react-i18next";

// Types
import { AppProviderProps } from "../types/context";
import { FiltersKeys, InfosList, RandomInfo } from "../types/randomInfo";

// Utils
import { getInfosFilters } from "../utils/infosFilters";
import { getInfosThemesList } from "../utils/infosThemesList";
import { getFormattedNumber } from "../utils/formattedNumber";
import { sumNumbers } from "../utils/sumNumbers";
import { percentage } from "../utils/percentage";

export function useGetRandomInfo(next: number) {
  const { actualLanguage, data }: AppProviderProps = useContext(AppContext);
  const { t } = useTranslation();

  const randomInfo = getRandomInfo();
  const [info, setInfo] = useState(randomInfo);

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

    const countryInfo = {
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

    const {
      country,
      countries,
      capital,
      continent,
      population,
      population_continent,
      population_continent_calc,
      area_biggest,
      independent,
      independent_calc,
    } = countryInfo;

    function getInfos(sentence: FiltersKeys | "default", params: object = {}) {
      return {
        randomCountryFromInfo,
        sentence: t(`didYouKnow.sentence.${sentence}`, params),
      };
    }

    switch (randomInfo?.type) {
      case "capital":
        return getInfos("capital", { country, capital });

      case "population_country":
        return getInfos("population_country", { country, population });

      case "population_country_biggest":
        return getInfos("population_country_biggest", { country, population });

      case "population_continent":
        return getInfos("population_continent", {
          continent,
          population_continent,
          population_continent_calc,
        });

      case "area_biggest":
        return getInfos("area_biggest", { country, area_biggest });

      case "independent":
        return getInfos("independent", { independent, independent_calc });

      default:
        return getInfos("default", { countries });
    }
  }

  useEffect(() => {
    const newInfo = getRandomInfo();
    setInfo(newInfo);
  }, [next]);

  return info;
}
