import { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../AppContext";
import { useParams } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

// Types
import { OnChangeSubmit, RankingProps, SubmitScoreProps } from "../../types/props";
import { AppProviderProps } from "../../types/context";
import { RankingsType } from "../../types/rankings";

// Commons
import { SUPABASE } from "../../commons/commons";

const supabase = createClient(SUPABASE.LINK, SUPABASE.KEY);

export function Ranking({ score, time }: RankingProps) {
  const { theme } = useParams();
  const { settingsState }: AppProviderProps = useContext(AppContext);
  const { nbOfChoices, nbOfQuestions, regionChosen } = settingsState;

  const [rankings, setRankings] = useState<RankingsType>([]);

  const [pseudo, setPseudo] = useState("");
  const [nationality, setNationality] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  function onChangeSubmit({ type, value }: OnChangeSubmit) {
    type === "pseudo" ? setPseudo(value) : setNationality(value);
  }

  async function getRankings() {
    const { data } = await supabase
      .from("rankings")
      .select()
      .eq("theme", theme)
      .eq("region", regionChosen)
      .eq("difficulty", nbOfChoices)
      .eq("length", nbOfQuestions)
      .order("score", { ascending: false })
      .order("time", { ascending: true })
      .order("date", { ascending: true });

    setRankings(data);
    // TEMPORAIRE :
    setHasSubmitted(false);
  }

  async function submitScore() {
    await supabase.from("rankings").insert([
      {
        pseudo,
        theme,
        region: regionChosen,
        difficulty: nbOfChoices,
        length: nbOfQuestions,
        score,
        time,
        nationality,
      },
    ]);

    setHasSubmitted(true);
    getRankings();
  }

  useEffect(() => {
    getRankings();
  }, []);

  return (
    <div>
      <h2>Rankings</h2>

      {!hasSubmitted && (
        <SubmitScore
          score={score}
          time={time}
          onChangeSubmit={onChangeSubmit}
          submitScore={submitScore}
        />
      )}
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Pseudo</th>
            <th>Nationality</th>
            <th>Score</th>
            <th>Time</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {rankings?.map((rank, index) => {
            const rankingsDate = new Date(rank.date);

            const formattedDate = {
              date: `${rankingsDate?.getDate().toString().padStart(2, "0")}/${rankingsDate
                ?.getMonth()
                .toString()
                .padStart(2, "0")}/${rankingsDate?.getFullYear().toString()}`,
              time: rankingsDate?.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            };

            return (
              <tr key={rank.id}>
                <td>{index + 1}</td>
                <td>{rank.pseudo}</td>
                <td>{rank.nationality}</td>
                <td>{rank.score}</td>
                <td>{rank.time}</td>
                <td>{`${formattedDate.date} at ${formattedDate.time}`}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function SubmitScore({ score, time, onChangeSubmit, submitScore }: SubmitScoreProps) {
  const { data }: AppProviderProps = useContext(AppContext);

  return (
    <div>
      <p>
        Avec un score de {score} point{score === 1 ? "" : "s"} en {time} seconde
        {time === 1 ? "" : "s"}, vous venez d'établir un nouveau record, félicitations !<br />
        Enregistrez le dès maintenant :
      </p>

      <input
        type="text"
        placeholder="Pseudo"
        onChange={(e) => onChangeSubmit({ type: "pseudo", value: e.target.value })}
      />

      <select
        name="nationality"
        id="nationality"
        onChange={(e) => onChangeSubmit({ type: "nationality", value: e.target.value })}
      >
        <option value="">Select your country</option>
        {data
          ?.map((item) => {
            return item.name.common;
          })
          .sort((a, b) => a.localeCompare(b))
          .map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
      </select>

      <button onClick={() => submitScore()}>Submit your score</button>
    </div>
  );
}
