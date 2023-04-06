import { useContext } from "react";
import { AppContext } from "../AppContext";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Hooks
import { useSettings } from "../hooks/settings";

// Types
import { AppProviderProps } from "../types/main";

type SettingsModaleProps = {
  quizTheme: any;
  setIsModaleOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

export function SettingsModale({ quizTheme, setIsModaleOpened }: SettingsModaleProps) {
  const { nbOfQuestions, setNbOfQuestions, nbOfChoices, setNbOfChoices }: AppProviderProps =
    useContext(AppContext);
  const { t } = useTranslation();
  const { difficulty, quizLength } = useSettings();

  const root = "modale.settings";

  return (
    <>
      <h2>{t(`quizList.${quizTheme.theme}.title`)}</h2>

      <h3>{t(`${root}.title`)}</h3>

      <div className="setting">
        <h4>{t(`${root}.difficulty.title`)}</h4>

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
        <h4>{t(`${root}.questions.title`)}</h4>

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

      <Link to={`/quiz/${quizTheme.theme}`} onClick={() => setIsModaleOpened(false)}>
        {t(`${root}.start`)}
      </Link>
    </>
  );
}
