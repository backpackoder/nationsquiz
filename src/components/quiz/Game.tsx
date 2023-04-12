import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../AppContext";
import { t } from "i18next";

// Types
import { AppProviderProps } from "../../types/context";

// Commons
import { THEMES } from "../../commons/commons";

// Utils
import { getFormattedPopulation } from "../../utils/getPopulation";

type GameProps = {
  isQuizfinished: boolean;
  gameState: any;
  gameDispatch: any;
};

export function Game({ isQuizfinished, gameState, gameDispatch }: GameProps) {
  const { theme } = useParams();
  const quizTheme = {
    is: {
      flags: theme === THEMES.FLAGS,
      capitals: theme === THEMES.CAPITALS,
      demography: theme === THEMES.DEMOGRAPHY,
    },
    isnt: {
      flags: theme !== THEMES.FLAGS,
      capitals: theme !== THEMES.CAPITALS,
      demography: theme !== THEMES.DEMOGRAPHY,
    },
  };
  const { actualLanguage, settingsState }: AppProviderProps = useContext(AppContext);
  const { nbOfChoices } = settingsState;
  const { hasResponded, responses, answer } = gameState;

  const [responseIndex, setResponseIndex] = useState(0);

  function getCountryName(index?: number) {
    return index === undefined
      ? answer?.data?.translations[actualLanguage]?.common ?? answer?.data?.name?.common
      : responses[index]?.translations[actualLanguage]?.common ?? responses[index]?.name?.common;
  }
  function getCapital(index: number) {
    return responses[index].capital[0];
  }

  function getChoices(index: number) {
    switch (theme) {
      case THEMES.FLAGS:
        return getCountryName(index);

      case THEMES.CAPITALS:
        return getCapital(index);

      case THEMES.DEMOGRAPHY:
        return getCountryName(index);

      default:
        throw new Error("Quiz theme not found");
    }
  }

  function responseSelected(index: number) {
    setResponseIndex(index);
    const isCorrect = index === answer.index;
    gameDispatch({ type: isCorrect ? "correct answer" : "wrong answer" });

    setTimeout(
      () => {
        gameDispatch({ type: "next question" });
      },
      isCorrect ? (quizTheme.is.demography ? 2000 : 1000) : quizTheme.is.demography ? 4000 : 2000
    );
  }

  return (
    <>
      <h3>{t(`quizList.${theme}.question`)}</h3>

      {quizTheme.isnt.demography && (
        <img
          src={answer.data.flags.png}
          alt={quizTheme.is.capitals ? "Mysterious flag" : answer.data.flags.alt}
          className="questionImg"
        />
      )}

      {quizTheme.is.capitals && (
        <p>
          <b>{getCountryName()}</b>
        </p>
      )}

      <ul>
        {Array(nbOfChoices)
          .fill(0)
          .map((_, index) => {
            const isResponseCorrect = index === answer.index;
            const isResponseWrong = index === responseIndex && !isResponseCorrect;

            return (
              <li
                key={index}
                className={`${isResponseCorrect ? "correctResponse" : "wrongResponse"} ${
                  hasResponded && (isResponseCorrect || isResponseWrong ? "active" : "inactive")
                }`}
                onClick={() => {
                  !isQuizfinished && !hasResponded && responseSelected(index);
                }}
              >
                {getChoices(index)}

                {quizTheme.is.demography && (
                  <>
                    <div className="responseImgWrapper">
                      <img
                        src={responses[index].flags.png}
                        alt={responses[index].flags.alt}
                        className="responseImg"
                      />
                    </div>
                    {hasResponded && (isResponseCorrect || isResponseWrong) && (
                      <p>
                        {getFormattedPopulation({
                          population: responses[index].population,
                          language: actualLanguage,
                        })}{" "}
                        {t("game.response.population")}
                      </p>
                    )}
                  </>
                )}
              </li>
            );
          })}
      </ul>
    </>
  );
}
