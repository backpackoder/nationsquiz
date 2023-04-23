import { useContext, useMemo, useState } from "react";
import { AppContext } from "../../AppContext";
import { useParams } from "react-router-dom";
import { t } from "i18next";

// Types
import { AppProviderProps } from "../../types/context";
import {
  CountryNameOfAnswerProps,
  DataRevealProps,
  FlagsOfResponsesProps,
  GameProps,
} from "../../types/props";
import { API_DATA } from "../../types/api";
import { SettingEnum, Difficulty } from "../../types/settings";
import { GameState, ResponsesDataType } from "../../types/quiz";

// Commons
import { THEMES } from "../../commons/commons";

// Utils
import { getFormattedNumber } from "../../utils/formattedNumber";

export function Game({ gameState, gameDispatch }: GameProps) {
  const { theme } = useParams();
  const quizTheme = {
    is: {
      flags: theme === THEMES.FLAGS,
      capitals: theme === THEMES.CAPITALS,
      demography: theme === THEMES.DEMOGRAPHY,
      borders: theme === THEMES.BORDERS,
      areas: theme === THEMES.AREAS,
    },
    isnt: {
      flags: theme !== THEMES.FLAGS,
      capitals: theme !== THEMES.CAPITALS,
      demography: theme !== THEMES.DEMOGRAPHY,
      borders: theme !== THEMES.BORDERS,
      areas: theme !== THEMES.AREAS,
    },
  };
  const { actualLanguage, data, settingsList, settingsState }: AppProviderProps =
    useContext(AppContext);
  const { nbOfChoices } = settingsState;
  const { hasResponded, responses, answer }: GameState = gameState;

  const isExpertMode =
    settingsState.nbOfChoices ===
    settingsList[SettingEnum.Difficulty].setting.values[Difficulty.Expert].value;

  const [responseIndex, setResponseIndex] = useState(0);

  function getCountryName(index?: number) {
    return index === undefined
      ? answer?.data?.translations[actualLanguage]?.common ?? answer?.data?.name?.common
      : responses[index]?.translations[actualLanguage]?.common ?? responses[index]?.name?.common;
  }

  function responseSelected(index: number) {
    setResponseIndex(index);
    const isCorrect = index === answer.index;
    gameDispatch({ type: isCorrect ? "correct answer" : "wrong answer" });

    setTimeout(
      () => {
        gameDispatch({ type: "next question" });
      },
      isCorrect
        ? quizTheme.is.demography || quizTheme.is.areas
          ? 2000
          : 1000
        : quizTheme.is.demography || quizTheme.is.areas
        ? 3000
        : 2000
    );
  }

  return (
    <>
      <h3>{t(`game.questions.${theme}`)}</h3>

      {(quizTheme.is.flags || quizTheme.is.capitals || quizTheme.is.borders) && (
        <FlagOfAnswer src={answer.data.flags.png} />
      )}

      {(quizTheme.is.capitals || quizTheme.is.borders) && !isExpertMode && (
        <CountryNameOfAnswer countryName={getCountryName()} />
      )}

      <ul>
        {Array(nbOfChoices)
          .fill(0)
          .map((_, index) => {
            const isResponseCorrect = index === answer.index;
            const isResponseWrong = index === responseIndex && !isResponseCorrect;

            const responsesData: ResponsesDataType = useMemo(() => {
              switch (theme) {
                case THEMES.FLAGS:
                  return {
                    text: getCountryName(index),
                    png: responses[index].flags.png,
                    alt: responses[index].flags.alt,
                  };

                case THEMES.CAPITALS:
                  return {
                    text: responses[index].capital[0],
                  };

                case THEMES.DEMOGRAPHY:
                  return {
                    text: !isExpertMode && getCountryName(index),
                    png: responses[index].flags.png,
                    alt: responses[index].flags.alt,
                  };

                case THEMES.BORDERS:
                  function getRandomNeighbourFromAnswer(): API_DATA {
                    return responses[answer.index].borders?.map(
                      (item: string) => data && data.find((country) => country.cca3 === item)
                    )[Math.floor(Math.random() * answer.data.borders.length)];
                  }

                  const randomNeighbourFromAnswer = getRandomNeighbourFromAnswer();

                  return {
                    text: isResponseCorrect
                      ? !isExpertMode && randomNeighbourFromAnswer?.name.common
                      : !isExpertMode && getCountryName(index),
                    png: isResponseCorrect
                      ? randomNeighbourFromAnswer?.flags.png
                      : responses[index].flags.png,
                    alt: isResponseCorrect
                      ? randomNeighbourFromAnswer?.flags.png
                      : responses[index].flags.alt,
                  };

                case THEMES.AREAS:
                  return {
                    text: !isExpertMode && getCountryName(index),
                    png: responses[index].flags.png,
                    alt: responses[index].flags.alt,
                  };

                default:
                  throw new Error("Quiz theme not found");
              }
            }, [responses]);

            return (
              <li
                key={index}
                className={`${isResponseCorrect ? "correctResponse" : "wrongResponse"} ${
                  hasResponded && (isResponseCorrect || isResponseWrong ? "active" : "inactive")
                } ${
                  quizTheme.is.demography || quizTheme.is.borders || quizTheme.is.areas
                    ? "limited"
                    : "unlimited"
                }`}
                onClick={() => {
                  !hasResponded && responseSelected(index);
                }}
              >
                <p>{responsesData?.text}</p>

                {(quizTheme.is.demography || quizTheme.is.borders || quizTheme.is.areas) && (
                  <>
                    <FlagsOfResponses responsesData={responsesData} />

                    {(quizTheme.is.demography || quizTheme.is.areas) &&
                      hasResponded &&
                      (isResponseCorrect || isResponseWrong) && (
                        <DataReveal theme={theme} responses={responses} index={index} />
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

type FlagOfAnswerProps = {
  // VOIR LES UTILITY TYPES POUR SRC
  src: string;
};

function FlagOfAnswer({ src }: FlagOfAnswerProps) {
  return <img src={src} alt="Mysterious flag" className="questionImg" />;
}

function CountryNameOfAnswer({ countryName }: CountryNameOfAnswerProps) {
  return (
    <p>
      <b>{countryName}</b>
    </p>
  );
}

function FlagsOfResponses({ responsesData }: FlagsOfResponsesProps) {
  return (
    <div className="responseImgWrapper">
      <img src={responsesData?.png} alt={responsesData?.alt} className="responseImg" />
    </div>
  );
}

function DataReveal({ theme, responses, index }: DataRevealProps) {
  const { actualLanguage }: AppProviderProps = useContext(AppContext);

  const data = useMemo(() => {
    switch (theme) {
      case THEMES.DEMOGRAPHY:
        return "population";

      case THEMES.AREAS:
        return "area";

      default:
        throw new Error("Theme not found");
    }
  }, [theme]);

  return theme ? (
    <p>
      {getFormattedNumber({
        number: responses[index][data],
        language: actualLanguage,
      })}{" "}
      {t(`game.response.${data}`)}
    </p>
  ) : null;
}
