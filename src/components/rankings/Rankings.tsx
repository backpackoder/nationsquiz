import { useContext, useEffect, useReducer, useState } from "react";
import { AppContext } from "../../AppContext";
import { useParams } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { useTranslation } from "react-i18next";

// Components
import { QuizModeSentence } from "../QuizModeSentence";

// Types
import { AppProviderProps } from "../../types/context";
import { RankingsInitialState, RankingsListOptions, RankingsType } from "../../types/rankings";

// Utils
import { getRankingsFilters } from "../../utils/rankingsFilters";

// Commons
import { SUPABASE, THEMES } from "../../commons/commons";
import { SearchBarRankings } from "./SearchBarRankings";
import { RankingsList } from "./RankingsList";
import { PlayThisQuizBtn } from "../buttons/PlayThisQuizBtn";

const supabase = createClient(SUPABASE.LINK, SUPABASE.KEY);

export type RankingsProps = {
  dispatch?: React.Dispatch<any>;
};

export function Rankings({ dispatch }: RankingsProps) {
  const { theme: themeParams } = useParams();
  const { t } = useTranslation();
  const { settingsState }: AppProviderProps = useContext(AppContext);
  const { nbOfChoices, nbOfQuestions, regionChosen } = settingsState;
  const [rankings, setRankings] = useState<RankingsType>(null);

  const rankingsFilters = getRankingsFilters({
    theme: themeParams ?? THEMES.FLAGS,
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

  const rankingsListOptions: RankingsListOptions = {
    rankings,
    showRank: true,
    showSettings: false,
    playBtn: false,
  };

  const [rankingsState, rankingsDispatch] = useReducer(reducer, rankingsInitialState);
  const { theme, region, difficulty, length, score, time } = rankingsState;

  function reducer(state: RankingsInitialState, action: any) {
    switch (action.type) {
      case "reset score and time":
        return {
          ...state,
          score: 0,
          time: 0,
        };

      case action.payload.type:
        return {
          ...state,
          [action.payload.type]: action.payload.value,
        };

      default:
        return state;
    }
  }

  async function getRankings() {
    setRankings(null);

    const { data } = await supabase
      .from(SUPABASE.TABLES.RANKINGS)
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

  useEffect(() => {
    getRankings();
  }, [rankingsState]);

  return (
    <article className="rankings">
      <h2>{t("rankings.title")}</h2>

      <SearchBarRankings rankingsFilters={rankingsFilters} dispatch={rankingsDispatch} />

      <div className="sentence">
        <QuizModeSentence theme={theme} settings={{ region, difficulty, length }} />

        <PlayThisQuizBtn settings={{ theme, region, difficulty, length }} dispatch={dispatch} />
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
        <RankingsList options={rankingsListOptions} />
      )}
    </article>
  );
}
