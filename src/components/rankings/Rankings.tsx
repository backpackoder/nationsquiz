import { useContext, useEffect, useReducer, useState } from "react";
import { AppContext } from "../../AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { Trans, useTranslation } from "react-i18next";
import { formatDistanceToNow } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

// Components
import { QuizModeSentence } from "../QuizModeSentence";

// Types
import { AppProviderProps } from "../../types/context";
import { RankingsInitialState, RankingsType } from "../../types/rankings";

// Utils
import { getRankingsFilters } from "../../utils/rankingsFilters";

// Commons
import { ROUTES, SUPABASE } from "../../commons/commons";
import { SearchBarRankings } from "./SearchBarRankings";

const supabase = createClient(SUPABASE.LINK, SUPABASE.KEY);

export function Rankings() {
  const { theme: themeParams } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
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

  function goToQuiz() {
    settingsDispatch({
      type: `goToQuiz`,
      payload: {
        value: "",
        region,
        difficulty,
        length,
      },
    });

    rankingsDispatch({ type: "reset score and time" });

    navigate(`../../${ROUTES.QUIZ.ROOT}${theme}`);
    window.location.reload();
  }

  useEffect(() => {
    getRankings();
  }, [rankingsState]);

  return (
    <article className="rankings">
      <h2>{t("rankings.title")}</h2>

      <SearchBarRankings rankingsFilters={rankingsFilters} dispatch={rankingsDispatch} />

      <div className="sentence">
        <QuizModeSentence theme={theme} settings={{ region, difficulty, length }} />

        <button onClick={() => goToQuiz()}>{t("rankings.playThisQuiz")}</button>
      </div>

      {!rankings ? (
        <div className="rankings-loading">
          <p>{t("rankings.loading")}</p>
        </div>
      ) : rankings && rankings.length === 0 ? (
        <div className="rankings-noRankings">
          <p>{t("rankings.noRankings")}</p>
        </div>
      ) : (
        <ul className="rankings-list">
          {rankings?.map((rank, index) => {
            const date = formatDistanceToNow(new Date(rank.date), {
              addSuffix: true,
              includeSeconds: false,
            });

            const nationalityFlag = data?.find(
              (country) => country.name.common === rank.nationality
            );

            return (
              <li key={index} className="rankings-item">
                <h3 className="rank">{index + 1}</h3>

                <div className="infos">
                  <div className="player">
                    <h4>{rank.pseudo}</h4>
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
                  </div>

                  <p className="scoreAndTime">
                    <Trans
                      components={{
                        span: <span></span>,
                      }}
                      values={{ score: rank.score, time: rank.time }}
                    >
                      {rank.score === 1 ? "ranking.scoreAndTime.one" : "ranking.scoreAndTime.many"}
                    </Trans>
                  </p>

                  <div className="date">
                    <FontAwesomeIcon icon={faClock} size="sm" />
                    <p>
                      <small>{date}</small>
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </article>
  );
}
