import { useContext, useMemo } from "react";
import { AppContext } from "../../AppContext";

// Types
import { AppProviderProps } from "../../types/main";
import { useParams } from "react-router-dom";
import { THEMES } from "../../commons/commons";
import { t } from "i18next";

type GameProps = {
  isQuizfinished: boolean;
  state: any;
  dispatch: any;
};

export function Game({ isQuizfinished, state, dispatch }: GameProps) {
  const { theme } = useParams();
  const { actualLanguage, nbOfChoices }: AppProviderProps = useContext(AppContext);
  const { hasResponded, isCorrect, responses, answer } = state;

  function responseSelected(index: any) {
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

      <img src={answer.data.flags.png} alt={answer.data.flags.alt} />

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
                    : hasResponded && !isCorrect
                    ? "active"
                    : "inactive"
                }`}
                onClick={() => {
                  !isQuizfinished && !hasResponded && responseSelected(index);
                }}
              >
                {actualLanguage === "en"
                  ? responses[index].name.common
                  : responses[index].translations[actualLanguage].common}
              </li>
            );
          })}
      </ul>
    </>
  );
}
