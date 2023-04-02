import { useContext } from "react";
import { AppContext } from "../../AppContext";

// Utils
import { difficulty, quizLength } from "../../utils/quiz";

// Types
import { AppProviderProps } from "../../types/main";

type SettingUpProps = {
  setHasQuizStarted: React.Dispatch<React.SetStateAction<boolean>>;
};

export function SettingUp({ setHasQuizStarted }: SettingUpProps) {
  const { nbOfQuestions, setNbOfQuestions, nbOfChoices, setNbOfChoices }: AppProviderProps =
    useContext(AppContext);

  return (
    <article className="settingUp">
      <h2>Paramètres</h2>

      <label htmlFor="questions-select">Nombre de questions</label>
      <select
        name="questions"
        id="questions-select"
        defaultValue={nbOfQuestions}
        onChange={(e: any) => setNbOfQuestions(parseInt(e.target.value, 10))}
      >
        {quizLength.map((item, index) => {
          return (
            <option key={index} value={item.questions}>
              {item.label}
            </option>
          );
        })}
      </select>

      <label htmlFor="difficulty-select">Difficulté</label>
      <select
        name="difficulty"
        id="difficulty-select"
        defaultValue={nbOfChoices}
        onChange={(e) => setNbOfChoices(parseInt(e.target.value, 10))}
      >
        {difficulty.map((item, index) => {
          return (
            <option key={index} value={item.choices}>
              {item.label}
            </option>
          );
        })}
      </select>

      <button onClick={() => setHasQuizStarted(true)}>Commencer la partie</button>
    </article>
  );
}
