import { useContext, useEffect, useMemo, useReducer, useState } from "react";
import { AppContext } from "../../AppContext";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

// Types
import { AppProviderProps } from "../../types/context";
import { RankingsType } from "../../types/rankings";

// Utils
import { rankingsFilters } from "../../utils/rankingsFilters";

// Commons
import { SUPABASE } from "../../commons/commons";
import { formatDistanceToNow } from "date-fns";

const supabase = createClient(SUPABASE.LINK, SUPABASE.KEY);

export function Rankings() {
  const navigate = useNavigate();
  const { data, settingsDispatch }: AppProviderProps = useContext(AppContext);
  const [rankings, setRankings] = useState<RankingsType>([]);

  function goToQuiz(rank: { [x: string]: any }) {
    const keys = Object.entries(rank).map(([key, value]) => {
      return { [key]: value };
    });

    const change = {
      theme: keys.find((item) => item.theme)?.theme,
      region: keys.find((item) => item.region)?.region,
      difficulty: keys.find((item) => item.difficulty)?.difficulty,
      length: keys.find((item) => item.length)?.length,
    };

    settingsDispatch({
      type: `goToQuiz`,
      payload: {
        value: "",
        region: change.region,
        difficulty: change.difficulty,
        length: change.length,
      },
    });

    navigate(`/quiz/${change.theme}`);
  }

  const initialState = {
    // Selects
    theme: "all",
    region: "all",
    difficulty: "all",
    length: "all",
    score: 0,
    time: 0,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  function reducer(state: any, action: any) {
    switch (action.type) {
      case action.payload.type:
        return {
          ...state,
          [action.payload.type]: action.payload.value,
        };

      default:
        return state;
    }
  }

  console.log("state", state);

  async function getRankings() {
    function getType(type: keyof typeof initialState) {
      const isDefault = state[type] === initialState[type];
      const column = isDefault ? "" : type;
      const value = isDefault ? "" : state[type];

      return { column, value };
    }

    const { data } = await supabase
      .from("rankings")
      .select()
      .eq(getType("theme").column, getType("theme").value)
      .eq(getType("region").column, getType("region").value)
      .eq(getType("difficulty").column, getType("difficulty").value)
      .eq(getType("length").column, getType("length").value)
      .gte(getType("score").column, getType("score").value)
      .lte(getType("time").column, getType("time").value)
      .order("score", { ascending: false })
      .order("time", { ascending: true })
      .order("date", { ascending: true });

    setRankings(data);
  }

  useEffect(() => {
    getRankings();
  }, [state]);

  return (
    <article className="rankings">
      <h2>Rankings</h2>

      <div className="searchBar rankings">
        {Object.entries(rankingsFilters).map(([key, value], index) => {
          return <Selector key={index} selector={key} options={value} dispatch={dispatch} />;
        })}
      </div>

      <p>
        {state.theme === "All" ? "ALL THEMES" : state.theme.toUpperCase()} of{" "}
        {state.region === "All" ? "WORLD" : state.region.toUpperCase()} (
        {state.difficulty === "All" ? "All difficulties" : state.difficulty} mode,{" "}
        {state.length === "All" ? "All lengths" : state.length} quiz)
      </p>

      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Pseudo</th>
            <th>Nationality</th>
            {state.theme === initialState.theme && <th>Theme</th>}
            {state.region === initialState.region && <th>Region</th>}
            {state.difficulty === initialState.difficulty && <th>Difficulty</th>}
            {state.length === initialState.length && <th>Length</th>}
            <th>Score</th>
            <th>Time</th>
            <th>Date</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {rankings?.map((rank, index) => {
            const date = formatDistanceToNow(new Date(rank.date), {
              addSuffix: true,
              includeSeconds: false,
            });

            const nationalityFlag = data?.find(
              (country) => country.name.common === rank.nationality
            );

            return (
              index < 10 && (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{rank.pseudo}</td>
                  <td>
                    {nationalityFlag ? (
                      <img
                        src={nationalityFlag?.flags.png}
                        alt={nationalityFlag?.flags.alt}
                        onClick={() => navigate(`/study/infos/${rank.nationality.toLowerCase()}`)}
                      />
                    ) : (
                      "Unknown"
                    )}
                  </td>
                  {state.theme === initialState.theme && <td>{rank.theme}</td>}
                  {state.region === initialState.region && <td>{rank.region}</td>}
                  {state.difficulty === initialState.difficulty && <td>{rank.difficulty}</td>}
                  {state.length === initialState.length && <td>{rank.length}</td>}
                  <td>{rank.score}</td>
                  <td>{rank.time}</td>
                  <td>{date}</td>
                  <td>
                    <button onClick={() => goToQuiz(rank)}>Play</button>
                  </td>
                </tr>
              )
            );
          })}
        </tbody>
      </table>
    </article>
  );
}

function Selector({ selector, options, dispatch }: any) {
  return (
    <div>
      <p>{options.title ?? selector}</p>

      <select
        name={selector}
        id={selector}
        onChange={(e) =>
          dispatch({
            type: selector,
            payload: { type: selector, value: e.target.value },
          })
        }
      >
        <option value={options.default.value}>{options.default.label}</option>
        {options.options.map((option: any, index: number) => {
          return (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}
