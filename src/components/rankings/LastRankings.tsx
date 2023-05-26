import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useTranslation } from "react-i18next";

// Types
import { RankingsListOptions, RankingsType } from "../../types/rankings";

// Components
import { RankingsList } from "./RankingsList";

// Commons
import { SUPABASE } from "../../commons/commons";

const supabase = createClient(SUPABASE.LINK, SUPABASE.KEY);

export function LastRankings() {
  const { t } = useTranslation();

  const [rankings, setRankings] = useState<RankingsType>(null);

  const rankingsListOptions: RankingsListOptions = {
    rankings,
    showRank: false,
    showSettings: true,
    playBtn: true,
  };

  async function getRankings() {
    setRankings(null);

    const { data } = await supabase
      .from(SUPABASE.TABLES.RANKINGS)
      .select()
      .limit(5)
      .order("date", { ascending: false });

    setRankings(data);
  }

  useEffect(() => {
    getRankings();
  }, []);

  return rankings && rankings.length > 0 ? (
    <div className="lastRankings">
      <h2>{t("rankings.lastRankings")}</h2>
      <RankingsList options={rankingsListOptions} />
    </div>
  ) : null;
}
