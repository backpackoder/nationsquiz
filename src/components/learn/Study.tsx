import unidecode from "unidecode";

import { useContext, useReducer } from "react";
import { AppContext } from "../../AppContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Components
import { SearchBar } from "./SearchBar";

// Types
import { AppProviderProps } from "../../types/context";
import { FilterState, ReducerAction } from "../../types/props";

// Utils
import { stringForUrl } from "../../utils/stringForUrl";

// Commons
import { ROUTES } from "../../commons/commons";
import { API_DATA } from "../../types/api";
import { getDataDependingOnLanguage } from "../../utils/getDataWithLanguage";

export function Study() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { actualLanguage, data }: AppProviderProps = useContext(AppContext);

  const initialState: FilterState = {
    sort: "",
    search: "",
    region: "",
    population: 0,
  };

  const [filterState, filterDispatch] = useReducer(reducer, initialState);

  const sortedData = data?.sort((a: API_DATA, b: API_DATA) => {
    switch (filterState.sort) {
      case "Name ascending":
        return getDataDependingOnLanguage({
          data: a,
          type: "common name",
          language: actualLanguage,
        }).localeCompare(
          getDataDependingOnLanguage({ data: b, type: "common name", language: actualLanguage })
        );

      case "Name descending":
        return getDataDependingOnLanguage({
          data: b,
          type: "common name",
          language: actualLanguage,
        }).localeCompare(
          getDataDependingOnLanguage({ data: a, type: "common name", language: actualLanguage })
        );

      case "Population ascending":
        return a.population - b.population;

      case "Population descending":
        return b.population - a.population;

      default:
        return 0;
    }
  });

  function reducer(state: FilterState, action: ReducerAction): FilterState {
    switch (action.type) {
      case action.type:
        return {
          ...state,
          [action.type]: action.payload,
        };

      default:
        throw new Error("Unexpected filters action");
    }
  }

  const filteredData = sortedData?.filter((item: API_DATA) => {
    return (
      unidecode(
        getDataDependingOnLanguage({ data: item, type: "common name", language: actualLanguage })
      )
        .toLowerCase()
        .includes(unidecode(filterState.search.toLowerCase())) &&
      item.region.includes(filterState.region) &&
      (filterState.population >= 0
        ? item.population >= filterState.population
        : item.population <= -filterState.population)
    );
  });

  return data && filteredData ? (
    <article>
      <SearchBar data={filteredData} filterDispatch={filterDispatch} />

      {filteredData.length > 0 ? (
        <div className="study">
          {filteredData.map((item, index) => {
            return (
              <div key={index} className="item">
                <h3>
                  {getDataDependingOnLanguage({
                    data: item,
                    type: "common name",
                    language: actualLanguage,
                  })}
                </h3>

                <div className="imgWrapper">
                  <img src={item.flags.svg} alt={item.flags.alt} />
                </div>

                <button
                  onClick={() => navigate(`${ROUTES.INFOS.ROOT}${stringForUrl(item.name.common)}`)}
                >
                  {t("study.infoSheet")}
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="noResult">{t("study.noResult")}</p>
      )}
    </article>
  ) : null;
}
