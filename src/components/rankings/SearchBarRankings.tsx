import { useTranslation } from "react-i18next";

// Types
import { SearchBarRankingsProps } from "../../types/props";

export function SearchBarRankings({ rankingsFilters, dispatch }: SearchBarRankingsProps) {
  const { t } = useTranslation();

  return (
    <div className="searchBar searchBar-rankings">
      {Object.entries(rankingsFilters).map(([key, value], index) => {
        return (
          <div key={index} className="selector">
            <p>{t(`rankings.filters.${value.title}.title`)}</p>

            <select
              name={key}
              id={key}
              defaultValue={value.default.value}
              onChange={(e) =>
                dispatch({
                  type: key,
                  payload: { type: key, value: e.target.value },
                })
              }
            >
              {value.options.map((option, index) => {
                return (
                  <option key={index} value={option.value}>
                    {t(`rankings.filters.${value.title}.${option.label}`)}
                  </option>
                );
              })}
            </select>
          </div>
        );
      })}
    </div>
  );
}
