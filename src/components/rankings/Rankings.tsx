import { useContext, useEffect, useReducer, useState } from "react";
import { AppContext } from "../../AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

// Types
import { AppProviderProps } from "../../types/context";
import { RankingsInitialState, RankingsType } from "../../types/rankings";

// Utils
import { getRankingsFilters } from "../../utils/rankingsFilters";

// Commons
import { ROUTES, SUPABASE } from "../../commons/commons";
import { formatDistanceToNow } from "date-fns";

const supabase = createClient(SUPABASE.LINK, SUPABASE.KEY);

export function Rankings() {
  const { theme: themeParams } = useParams();
  const navigate = useNavigate();
  const { data, settingsState, settingsDispatch }: AppProviderProps = useContext(AppContext);
  const { nbOfChoices, nbOfQuestions, regionChosen } = settingsState;
  const [rankings, setRankings] = useState<RankingsType>(null);

  const rankingsFilters = getRankingsFilters({
    theme: themeParams ?? "flags",
    difficulty: nbOfChoices,
    length: nbOfQuestions,
    region: regionChosen,
  });

  const rankingsInitialState: RankingsInitialState = {
    theme: rankingsFilters.theme.default.value,
    region: regionChosen,
    difficulty: nbOfChoices,
    length: nbOfQuestions,
    score: 0,
    time: 999,
  };

  const [rankingsState, rankingsDispatch] = useReducer(reducer, rankingsInitialState);
  const { theme, region, difficulty, length, score, time } = rankingsState;

  function reducer(state: RankingsInitialState, action: any) {
    switch (action.type) {
      case action.payload.type:
        return {
          ...state,
          [action.payload.type]: action.payload.value,
        };

      case "reset score and time":
        return {
          ...state,
          score: 0,
          time: 0,
        };

      default:
        return state;
    }
  }

  async function getRankings() {
    setRankings(null);

    const { data } = await supabase
      .from("rankings")
      .select()
      .eq("theme", theme)
      .eq("region", region)
      .eq("difficulty", difficulty)
      .eq("length", length)
      .gte("score", score)
      .lte("time", time)
      .order("score", { ascending: false })
      .order("time", { ascending: true })
      .order("date", { ascending: true });

    setRankings(data);
  }

  function goToQuiz(rank?: { [x: string]: any }) {
    const keys =
      rank &&
      Object.entries(rank).map(([key, value]) => {
        return { [key]: value };
      });

    const change = keys && {
      theme: keys.find((item) => item.theme)?.theme,
      region: keys.find((item) => item.region)?.region,
      difficulty: keys.find((item) => item.difficulty)?.difficulty,
      length: keys.find((item) => item.length)?.length,
    };

    settingsDispatch({
      type: `goToQuiz`,
      payload: {
        value: "",
        region: change?.region ?? region,
        difficulty: change?.difficulty ?? difficulty,
        length: change?.length ?? length,
      },
    });

    rankingsDispatch({ type: "reset score and time", payload: { type: "nope" } });

    navigate(`../../${ROUTES.QUIZ.ROOT}${rank ? change?.theme : theme}`);
    window.location.reload();
  }

  useEffect(() => {
    getRankings();
  }, [rankingsState]);

  return (
    <article className="rankings">
      <h2>Rankings</h2>

      <div className="searchBar rankings">
        {Object.entries(rankingsFilters).map(([key, value], index) => {
          return (
            <Selector key={index} selector={key} options={value} dispatch={rankingsDispatch} />
          );
        })}
      </div>

      <p>
        {theme} of {region} ({difficulty} mode, {length} quiz)
      </p>

      {!rankings ? (
        <div>
          <p>Chargement des classements en cours...</p>
        </div>
      ) : rankings && rankings.length === 0 ? (
        <div>
          <p>Ce quiz n'a pas encore de records... Soyez le premier !</p>
          <button onClick={() => goToQuiz()}>Jouer</button>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Pseudo</th>
              <th>Score</th>
              <th>Time</th>
              <th>Date</th>
              <th>Beat it</th>
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
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <span>
                      {rank.pseudo}{" "}
                      {nationalityFlag && (
                        <img
                          src={nationalityFlag?.flags.png}
                          alt={nationalityFlag?.flags.alt}
                          onClick={() =>
                            navigate(
                              `../${ROUTES.STUDY}${
                                ROUTES.INFOS.ROOT
                              }${rank.nationality.toLowerCase()}`
                            )
                          }
                        />
                      )}
                    </span>
                  </td>
                  <td>{rank.score}</td>
                  <td>{rank.time}</td>
                  <td>{date}</td>
                  <td>
                    <button onClick={() => goToQuiz(rank)}>Play</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
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
        defaultValue={options.default.value}
        onChange={(e) =>
          dispatch({
            type: selector,
            payload: { type: selector, value: e.target.value },
          })
        }
      >
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
