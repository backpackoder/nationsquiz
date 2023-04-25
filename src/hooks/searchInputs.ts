import { useTranslation } from "react-i18next";

// Types
import { InputProps } from "../types/search";

// Commons
import { CONTINENTS } from "../commons/commons";

export function useSearchInputs() {
  const { t } = useTranslation();

  const searchInputs: InputProps = [
    {
      label: t("searchBar.sort.label"),
      name: "sort",
      options: [
        { value: "", label: t("searchBar.sort.options.default") },
        { value: "Name ascending", label: t("searchBar.sort.options.name_ascending") },
        { value: "Name descending", label: t("searchBar.sort.options.name_descending") },
        {
          value: "Population descending",
          label: t("searchBar.sort.options.population_descending"),
        },
        { value: "Population ascending", label: t("searchBar.sort.options.population_ascending") },
      ],
    },
    {
      label: t("searchBar.region.label"),
      name: "region",
      options: [
        { value: "", label: t("searchBar.region.options.default") },
        { value: CONTINENTS.AFRICA, label: t("searchBar.region.options.africa") },
        { value: CONTINENTS.AMERICAS, label: t("searchBar.region.options.americas") },
        { value: CONTINENTS.ASIA, label: t("searchBar.region.options.asia") },
        { value: CONTINENTS.EUROPE, label: t("searchBar.region.options.europe") },
        { value: CONTINENTS.OCEANIA, label: t("searchBar.region.options.oceania") },
      ],
    },
    {
      label: t("searchBar.population.label"),
      name: "population",
      options: [
        { value: 0, label: t("searchBar.population.options.default") },
        { value: 100_000_000, label: t("searchBar.population.options.more100m") },
        { value: -100_000_000, label: t("searchBar.population.options.less100m") },
        { value: 10_000_000, label: t("searchBar.population.options.more10m") },
        { value: -10_000_000, label: t("searchBar.population.options.less10m") },
        { value: 1_000_000, label: t("searchBar.population.options.more1m") },
        { value: -1_000_000, label: t("searchBar.population.options.less1m") },
        { value: 100_000, label: t("searchBar.population.options.more100k") },
        { value: -100_000, label: t("searchBar.population.options.less100k") },
        { value: 10_000, label: t("searchBar.population.options.more10k") },
        { value: -10_000, label: t("searchBar.population.options.less10k") },
      ],
    },
  ];

  return { searchInputs };
}
