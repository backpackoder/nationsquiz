import { useContext } from "react";
import { AppContext } from "../../AppContext";

// Types
import { AppProviderProps } from "../../types/main";

type GameProps = {
  isQuizfinished: boolean;
  state: any;
  dispatch: any;
};

export function Game({ isQuizfinished, state, dispatch }: GameProps) {
  const { actualLanguage, data, nbOfChoices }: AppProviderProps = useContext(AppContext);
  const {
    correctResponseData,
    correctResponseRandomIndex,
    wrongResponsesData,
    hasResponded,
    isCorrect,
  } = state;

  function responseSelected(index: any) {
    const isCorrect = index === correctResponseRandomIndex;

    !isQuizfinished && dispatch({ type: isCorrect ? "correct answer" : "wrong answer" });

    setTimeout(
      () => {
        dispatch({ type: "next question" });
      },
      isCorrect ? 1000 : 2000
    );
  }

  return (
    <>
      <h3>De quel pays est ce drapeau ?</h3>

      <img src={correctResponseData?.flags?.png} alt={correctResponseData?.flags?.alt} />

      <ul>
        {Array(nbOfChoices)
          .fill(0)
          .map((_, index) => {
            const isResponseCorrect = index === correctResponseRandomIndex;
            const response = isResponseCorrect
              ? correctResponseData
              : data[wrongResponsesData[index]];

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
                  ? response.name.common
                  : response.translations[actualLanguage].common}
              </li>
            );
          })}
      </ul>
    </>
  );
}
