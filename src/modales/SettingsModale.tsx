import { useContext } from "react";
import { AppContext } from "../AppContext";

// Utils
import { difficulty, quizLength } from "../utils/settings";

// Types
import { AppProviderProps } from "../types/main";
import { Link } from "react-router-dom";

type SettingsModaleProps = {
  theme: any;
  setIsModaleOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

export function SettingsModale({ theme, setIsModaleOpened }: SettingsModaleProps) {
  const { nbOfQuestions, setNbOfQuestions, nbOfChoices, setNbOfChoices }: AppProviderProps =
    useContext(AppContext);

  return (
    <>
      <h2>{theme.title}</h2>

      <h3>Paramètres</h3>

      <div className="setting">
        <h4>Difficulté</h4>

        <div className="buttons">
          {difficulty.map((item, index) => {
            return (
              <button
                key={index}
                className={nbOfChoices === item.choices ? "active" : "inactive"}
                onClick={() => setNbOfChoices(item.choices)}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="setting">
        <h4>Questions</h4>

        <div className="buttons">
          {quizLength.map((item, index) => {
            return (
              <button
                key={index}
                className={nbOfQuestions === item.questions ? "active" : "inactive"}
                onClick={() => setNbOfQuestions(item.questions)}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <Link to={`/quiz/${theme.theme}`} onClick={() => setIsModaleOpened(false)}>
        Commencer la partie
      </Link>
    </>
  );
}
