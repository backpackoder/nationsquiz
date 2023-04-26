import { useContext, useReducer } from "react";
import { AppContext } from "../../AppContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Components
import { SearchBar } from "./SearchBar";

// Types
import { AppProviderProps } from "../../types/context";

// Utils
import { stringForUrl } from "../../utils/stringForUrl";

// Commons
import { ROUTES } from "../../commons/commons";

type FilterState = {
  sort: string;
  search: string;
  region: string;
  population: number;
};

export function Study() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data }: AppProviderProps = useContext(AppContext);

  const initialState: FilterState = {
    sort: "",
    search: "",
    region: "",
    population: 0,
  };

  const [filterState, filterDispatch] = useReducer(reducer, initialState);

  const sortedData = data?.sort((a: any, b: any) => {
    switch (filterState.sort) {
      case "Name ascending":
        return a.name.common.localeCompare(b.name.common);

      case "Name descending":
        return b.name.common.localeCompare(a.name.common);

      case "Population ascending":
        return a.population - b.population;

      case "Population descending":
        return b.population - a.population;

      default:
        return a + b;
    }
  });

  function reducer(state: any, action: any) {
    switch (action.type) {
      case "sort":
        return {
          ...state,
          sort: action.payload,
        };

      case "writing":
        return {
          ...state,
          search: action.payload,
        };

      case "region":
        return {
          ...state,
          region: action.payload,
        };

      case "population":
        return {
          ...state,
          population: action.payload,
        };

      case "reset":
        return initialState;

      default:
        throw new Error("Unexpected filters action");
    }
  }

  const filteredData = sortedData?.filter((item: any) => {
    return (
      item.name.common.toLowerCase().includes(filterState.search.toLowerCase()) &&
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
                {/* <h3>{item.translations[actualLanguage]?.common ?? item.name.common}</h3> */}
                {/* EN DESSOUS A RENDRE DYNAMIQUE EN FONCTION DE LA LANGUE */}
                <h3>{item.translations["fra"]?.common ?? item.name.common}</h3>

                <div className="imgWrapper">
                  <img src={item.flags.png} alt={item.flags.alt} />
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
