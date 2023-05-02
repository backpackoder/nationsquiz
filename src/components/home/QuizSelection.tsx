import { useState } from "react";
import { useTranslation } from "react-i18next";

// Types
import { QuizData } from "../../types/quiz";

// Utils
import { useQuizData } from "../../hooks/quizData";

// Components
import { Rankings } from "../rankings/Rankings";
import { Modale } from "../../modales/Modale";
import { SettingsModale } from "../../modales/SettingsModale";

export function QuizList() {
  const { t } = useTranslation();
  const quizData = useQuizData();

  const [isModaleOpened, setIsModaleOpened] = useState(false);

  const [quizTheme, setQuizTheme] = useState(quizData[0]);

  function openModale(theme: QuizData) {
    setQuizTheme(theme);
    setIsModaleOpened(true);
  }

  return (
    <article className="quiz-selection">
      <h2>{t("quizList.title")}</h2>

      <ul className="quiz-item">
        {quizData.map((item, index) => {
          const { description, theme, title } = item;

          return (
            <li key={index} onClick={() => openModale(item)} data-title={description}>
              <h3>{title}</h3>

              <div className="imgWrapper">
                <img src={`../imgs/${theme}.jpg`} alt={theme} />
              </div>

              <button>{t("quizList.start")}</button>
            </li>
          );
        })}
      </ul>

      <Rankings />

      {isModaleOpened && (
        <Modale
          name="settings"
          children={<SettingsModale quizTheme={quizTheme} setIsModaleOpened={setIsModaleOpened} />}
          setIsModaleOpened={setIsModaleOpened}
        />
      )}
    </article>
  );
}
