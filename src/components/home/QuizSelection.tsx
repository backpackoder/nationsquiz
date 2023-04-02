import { useState } from "react";

// Components
import { SettingsModale } from "../../modales/SettingsModale";
import { Modale } from "../../modales/Modale";

const quizData = [
  {
    theme: "flags",
    title: "Drapeaux",
    description: "Quiz sur les drapeaux des pays",
  },
  {
    theme: "capitals",
    title: "Capitales",
    description: "Quiz sur les capitales des pays",
  },
  {
    theme: "demography",
    title: "Demographie",
    description: "Quel pays à le plus d'habitants ?",
  },
];

export function QuizSelection() {
  const [isModaleOpened, setIsModaleOpened] = useState(false);

  const [themeClicked, setThemeClicked] = useState("");

  function openModale(theme: any) {
    setThemeClicked(theme);
    setIsModaleOpened(true);
  }

  return (
    <section className="quiz-selection">
      <h2>Choisissez votre quiz</h2>

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

              <button>Je commence le quiz</button>
            </div>
          );
        })}
      </article>

      {isModaleOpened && (
        <Modale
          modale="settings"
          children={<SettingsModale theme={themeClicked} setIsModaleOpened={setIsModaleOpened} />}
          setIsModaleOpened={setIsModaleOpened}
        />
      )}
    </section>
  );
}
