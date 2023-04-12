// Types
import { useSearchInputs } from "../../hooks/searchInputs";
import { API_DATA } from "../../types/api";

type SearchBarProps = {
  data: API_DATA;
  filterDispatch: any;
};

export function SearchBar({ data, filterDispatch }: SearchBarProps) {
  const { searchInputs } = useSearchInputs();

  return data ? (
    <div className="searchBar">
      <p>results: {data.length}</p>

      {searchInputs.map((input) => (
        <div className="searchItem" key={input.name}>
          <label htmlFor={input.name}>{input.label}</label>
          <select
            name={input.name}
            id={input.name}
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
        placeholder="Rechercher un pays"
        onChange={(e) => filterDispatch({ type: "writing", payload: e.target.value })}
      />

      {/* onClick={() => filterDispatch({ type: "reset" })} */}
      <button onClick={() => window.location.reload()}>Rester filters</button>
    </div>
  ) : null;
}
