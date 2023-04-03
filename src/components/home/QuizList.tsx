import { useState } from "react";
import { useTranslation } from "react-i18next";

// Utils
import { useQuizData } from "../../hooks/quizData";

// Components
import { Modale } from "../../modales/Modale";
import { SettingsModale } from "../../modales/SettingsModale";

export function QuizList() {
  const { t } = useTranslation();

  const [isModaleOpened, setIsModaleOpened] = useState(false);

  const [themeClicked, setThemeClicked] = useState("");

  function openModale(theme: any) {
    setThemeClicked(theme);
    setIsModaleOpened(true);
  }

  const { quizData } = useQuizData();

  return (
    <section className="quiz-selection">
      <h2>{t("quizList.title")}</h2>

      <article className="quiz-selection__list">
        {quizData.map((item, index) => {
          const { description, theme, title } = item;

          return (
            <div
              key={index}
              className="quiz-selection__item"
              onClick={() => openModale(item)}
              data-title={description}
            >
              <h3>{title}</h3>

              <div className="imgWrapper">
                <img src={`../src/assets/imgs/${theme}.jpg`} alt={theme} />
              </div>

              <button>{t("quizList.start")}</button>
            </div>
          );
        })}
      </article>

      {isModaleOpened && (
        <Modale
          name="settings"
          children={<SettingsModale theme={themeClicked} setIsModaleOpened={setIsModaleOpened} />}
          setIsModaleOpened={setIsModaleOpened}
        />
      )}
    </section>
  );
}
