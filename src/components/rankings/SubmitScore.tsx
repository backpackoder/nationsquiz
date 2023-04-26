import { useContext } from "react";
import { AppContext } from "../../AppContext";

// Types
import { SubmitScoreProps } from "../../types/props";
import { AppProviderProps } from "../../types/context";

export function SubmitScore({ infosToSubmit, onChangeSubmit, submitScore }: SubmitScoreProps) {
  const { data }: AppProviderProps = useContext(AppContext);
  const { pseudo, nationality, score, time } = infosToSubmit;

  return (
    <div>
      <p>
        Avec un score de {score} point{score === 1 ? "" : "s"} en {time} seconde
        {time === 1 ? "" : "s"}, vous venez d'établir un nouveau record, félicitations !<br />
        Enregistrez le dès maintenant :
      </p>

      <input
        type="text"
        placeholder="Your name"
        value={pseudo}
        onChange={(e) => onChangeSubmit({ type: "pseudo", value: e.target.value })}
      />

      <select
        name="nationality"
        id="nationality"
        value={nationality}
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
