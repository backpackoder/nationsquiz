import { useContext, useState } from "react";
import { AppContext } from "../../AppContext";
import { useParams } from "react-router-dom";
import { t } from "i18next";

// Types
import { AppProviderProps } from "../../types/context";
import { GameState } from "../../types/quiz";

// Commons
import { THEMES } from "../../commons/commons";

// Utils
import { getFormattedNumber } from "../../utils/formattedNumber";

type GameProps = {
  gameState: any;
  gameDispatch: any;
};

export function Game({ gameState, gameDispatch }: GameProps) {
  const { theme } = useParams();
  const quizTheme = {
    is: {
      flags: theme === THEMES.FLAGS,
      capitals: theme === THEMES.CAPITALS,
      demography: theme === THEMES.DEMOGRAPHY,
      borders: theme === THEMES.BORDERS,
    },
    isnt: {
      flags: theme !== THEMES.FLAGS,
      capitals: theme !== THEMES.CAPITALS,
      demography: theme !== THEMES.DEMOGRAPHY,
      borders: theme !== THEMES.BORDERS,
    },
  };
  const { actualLanguage, data, settingsState }: AppProviderProps = useContext(AppContext);
  const { nbOfChoices } = settingsState;
  const { hasResponded, responses, answer }: GameState = gameState;

  const [responseIndex, setResponseIndex] = useState(0);

  function getCountryName(index?: number) {
    return index === undefined
      ? answer?.data?.translations[actualLanguage]?.common ?? answer?.data?.name?.common
      : responses[index]?.translations[actualLanguage]?.common ?? responses[index]?.name?.common;
  }
  function getCapital(index: number) {
    return responses[index].capital[0];
  }

  function getBorders(index: number) {
    const nameOfResponse = responses[index].name.common;

    const countriesNotBorderingList = responses?.filter(
      (item) =>
        !item.borders.some((border) => border === responses[index].cca3) &&
        item.cca3 !== responses[index].cca3
    );

    const countriesNotBorderingListString = countriesNotBorderingList
      .map((item) => item.name.common)
      .join(", ");

    const randomBorder = Math.floor(Math.random() * responses[index].borders.length);
    return responses[index];
  }

  function getChoices(index: number) {
    switch (theme) {
      case THEMES.FLAGS:
        return getCountryName(index);

      case THEMES.CAPITALS:
        return getCapital(index);

      case THEMES.DEMOGRAPHY:
        return getCountryName(index);

      case THEMES.BORDERS:
        return getBorders(index);

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
      isCorrect ? (quizTheme.is.demography ? 2000 : 1000) : quizTheme.is.demography ? 3000 : 2000
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

      {quizTheme.is.capitals ||
        (quizTheme.is.borders && (
          <p>
            <b>{getCountryName()}</b>
          </p>
        ))}

      <ul>
        {Array(nbOfChoices)
          .fill(0)
          .map((_, index) => {
            const isResponseCorrect = index === answer.index;
            const isResponseWrong = index === responseIndex && !isResponseCorrect;

            const countryDataFromBorder = data?.find(
              (country) =>
                country.name.common ===
                responses[index].borders
                  ?.map((item) => data && data.find((country) => country.cca3 === item))
                  .map((item) => item?.name.common)
                  .find((item) => item === country.name.common)
            );

            return (
              <li
                key={index}
                className={`${isResponseCorrect ? "correctResponse" : "wrongResponse"} ${
                  hasResponded && (isResponseCorrect || isResponseWrong ? "active" : "inactive")
                }`}
                onClick={() => {
                  !hasResponded && responseSelected(index);
                }}
              >
                {quizTheme.is.borders
                  ? isResponseCorrect
                    ? countryDataFromBorder?.name.common
                    : getChoices(index)?.name.common
                  : getChoices(index)}

                {quizTheme.is.demography ||
                  (quizTheme.is.borders && (
                    <>
                      <div className="responseImgWrapper">
                        <img
                          src={
                            quizTheme.is.borders
                              ? isResponseCorrect
                                ? countryDataFromBorder?.flags.png
                                : getChoices(index)?.flags.png
                              : responses[index].flags.png
                          }
                          alt={
                            quizTheme.is.borders
                              ? isResponseCorrect
                                ? countryDataFromBorder?.flags.alt
                                : getChoices(index)?.flags.alt
                              : responses[index].flags.alt
                          }
                          className="responseImg"
                        />
                      </div>
                      {quizTheme.is.demography && hasResponded && (
                        <p>
                          {getFormattedNumber({
                            number: responses[index].population,
                            language: actualLanguage,
                          })}{" "}
                          {t("game.response.population")}
                        </p>
                      )}
                    </>
                  ))}
              </li>
            );
          })}
      </ul>
    </>
  );
}
