import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftRotate } from "@fortawesome/free-solid-svg-icons";

// Types
import { SearchBarProps } from "../../types/props";

// Hooks
import { useSearchInputs } from "../../hooks/searchInputs";

export function SearchBar({ data, filterDispatch }: SearchBarProps) {
  const { searchInputs } = useSearchInputs();
  const { t } = useTranslation();

  const results = data?.length;

  const dataLength = useMemo(() => {
    switch (data?.length) {
      case 0:
        return t("searchBar.results.none");

      case 1:
        return t("searchBar.results.one");

      default:
        return t("searchBar.results.many", { results });
    }
  }, [data]);

  return data ? (
    <div className="searchBar">
      <p>{dataLength}</p>

      {searchInputs.map((input) => (
        <div className="searchItem" key={input.name}>
          <label htmlFor={input.name}>{input.label}</label>
          <select
            name={input.name}
            id={input.name}
            defaultValue={input.options[0].value}
            onChange={(e) => filterDispatch({ type: input.name, payload: e.target.value })}
          >
            {input.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      ))}

      <input
        type="text"
        placeholder={t("searchBar.placeholder") ?? "Type..."}
        className="searchInput"
        onChange={(e) => filterDispatch({ type: "search", payload: e.target.value })}
      />

      <button onClick={() => window.location.reload()}>
        <FontAwesomeIcon icon={faArrowLeftRotate} color="#fff" size="xl" />
      </button>
    </div>
  ) : null;
}
