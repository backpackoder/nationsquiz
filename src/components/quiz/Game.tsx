import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../AppContext";
import { t } from "i18next";

// Types
import { AppProviderProps } from "../../types/main";

// Commons
import { THEMES } from "../../commons/commons";

type GameProps = {
  isQuizfinished: boolean;
  state: any;
  dispatch: any;
};

export function Game({ isQuizfinished, state, dispatch }: GameProps) {
  const { theme } = useParams();
  const { actualLanguage, nbOfChoices }: AppProviderProps = useContext(AppContext);
  const { hasResponded, isCorrect, responses, answer } = state;

  const [responseIndex, setResponseIndex] = useState(0);

  function getCountryName(index?: number) {
    return index !== undefined
      ? responses[index]?.translations[actualLanguage]?.common ?? responses[index]?.name?.common
      : answer?.data?.translations[actualLanguage]?.common ?? answer?.data?.name?.common;
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
        throw new Error("Theme not found");
    }
  }

  function responseSelected(index: number) {
    setResponseIndex(index);
    const isCorrect = index === answer.index;
    dispatch({ type: isCorrect ? "correct answer" : "wrong answer" });

    setTimeout(
      () => {
        dispatch({ type: "next question" });
      },
      isCorrect ? 1000 : 2000
    );
  }

  return (
    <>
      <h3>{t(`quizList.${theme}.question`)}</h3>

      {theme !== THEMES.DEMOGRAPHY && (
        <img src={answer.data.flags.png} alt={answer.data.flags.alt} className="questionImg" />
      )}

      {theme === THEMES.CAPITALS && (
        <p>
          <b>{getCountryName()}</b>
        </p>
      )}

      <ul>
        {Array(nbOfChoices)
          .fill(0)
          .map((_, index) => {
            const isResponseCorrect = index === answer.index;

            return (
              <li
                key={index}
                className={`${isResponseCorrect ? "correctResponse" : "wrongResponse"} ${
                  isResponseCorrect
                    ? hasResponded
                      ? "active"
                      : "inactive"
                    : hasResponded && !isCorrect && index === responseIndex
                    ? "active"
                    : "inactive"
                }`}
                onClick={() => {
                  !isQuizfinished && !hasResponded && responseSelected(index);
                }}
              >
                {getChoices(index)}

                {theme === THEMES.DEMOGRAPHY && (
                  <div className="responseImgWrapper">
                    <img
                      src={responses[index].flags.png}
                      alt={responses[index].flags.alt}
                      className="responseImg"
                    />
                  </div>
                )}
              </li>
            );
          })}
      </ul>
    </>
  );
}
