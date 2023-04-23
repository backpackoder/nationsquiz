import { useContext, useMemo, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../AppContext";
import { Trans } from "react-i18next";

// Types
import { AppProviderProps } from "../../types/context";

// Components
import { Game } from "./Game";
import { Result } from "./Result";
import { Buttons } from "./Buttons";
import { Modale } from "../../modales/Modale";
import { GameModale } from "../../modales/GameModale";

// Types
import { API_DATA } from "../../types/api";
import { GameState } from "../../types/quiz";

// Commons
import { THEMES } from "../../commons/commons";

// Utils
import { getCountriesList } from "../../utils/getCountriesList";

type Answer = any;
// {
//   data: API_DATA;
//   index: number;
// }

export function Quiz() {
  const { theme } = useParams();
  const { data, settingsState }: AppProviderProps = useContext(AppContext);
  const { nbOfChoices, nbOfQuestions, regionChosen: region } = settingsState;

  const [isModaleOpened, setIsModaleOpened] = useState(false);

  function getResponses() {
    const countriesList = data && getCountriesList({ data, theme, region });
    let responses: API_DATA[] = [];
    let definedAnswer, randomAnswer, answer: Answer;

    do {
      for (let i = 0; i < nbOfChoices; i++) {
        const randomCountry =
          countriesList && countriesList[Math.floor(Math.random() * countriesList.length)];
        randomCountry && responses.push(randomCountry);
        randomCountry && countriesList.splice(countriesList.indexOf(randomCountry), 1);
      }

      function getUniqueResponses(theme: string) {
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

        return new Set(responses.map((country: any) => country[data]));
      }

      switch (theme) {
        case THEMES.DEMOGRAPHY:
          if (getUniqueResponses(THEMES.DEMOGRAPHY).size === responses.length) {
            definedAnswer = getDefinedAnswer(THEMES.DEMOGRAPHY);
            answer = {
              data: definedAnswer,
              index: responses.indexOf(definedAnswer),
            };
          } else {
            responses = [];
          }
          break;

        case THEMES.BORDERS:
          randomAnswer = getRandomAnswer();
          answer = {
            data: randomAnswer,
            index: responses.indexOf(randomAnswer),
          };
          const bordersChecker = responses.filter((country) =>
            country.borders.some((item) => item === answer.data.cca3)
          );
          function replaceResponse() {
            const filtering = countriesList?.filter((country) =>
              answer.data.borders.every((border: string) => border !== country.cca3)
            );
            const newRandomCountry =
              filtering && filtering[Math.floor(Math.random() * filtering.length)];
            newRandomCountry && countriesList?.splice(countriesList.indexOf(newRandomCountry), 1);
            return newRandomCountry;
          }
          bordersChecker.length > 0 &&
            bordersChecker.map((item) =>
              responses.splice(responses.indexOf(item), 1, replaceResponse()!)
            );
          break;

        case THEMES.AREAS:
          if (getUniqueResponses(THEMES.AREAS).size === responses.length) {
            definedAnswer = getDefinedAnswer(THEMES.AREAS);
            answer = {
              data: definedAnswer,
              index: responses.indexOf(definedAnswer),
            };
          } else {
            responses = [];
          }
          break;

        default:
          randomAnswer = getRandomAnswer();
          answer = {
            data: randomAnswer,
            index: responses.indexOf(randomAnswer),
          };
          break;
      }
    } while (!answer);

    function getRandomAnswer() {
      return responses[Math.floor(Math.random() * responses.length)];
    }

    function getDefinedAnswer(theme: string) {
      function getBiggestPopulation() {
        const populations = responses.map((country: any) => country.population);
        const biggest = Math.max(...populations);
        const answerIndex = populations.findIndex((population: any) => population === biggest);
        return responses[answerIndex];
      }

      function getBiggestArea() {
        const areas = responses.map((country: any) => country.area);
        const biggest = Math.max(...areas);
        const answerIndex = areas.findIndex((area: any) => area === biggest);
        return responses[answerIndex];
      }

      return theme === THEMES.DEMOGRAPHY ? getBiggestPopulation() : getBiggestArea();
    }

    return { responses, answer };
  }

  const choices = getResponses();

  const initialState: GameState = {
    actualQuestion: 1,
    score: 0,

    responses: choices.responses,
    answer: choices.answer,

    hasResponded: false,
    hasRestarted: false,

    gameModale: {
      description: "",
      confirmation: "",
    },
  };

  const [gameState, gameDispatch] = useReducer<React.Reducer<any, any>>(reducer, initialState);

  const { actualQuestion, score, gameModale } = gameState;

  const isQuizfinished = actualQuestion > nbOfQuestions;

  console.log("hasRestarted", gameState.hasRestarted);
  function reducer(state: any, action: any) {
    switch (action.type) {
      case "correct answer":
        return {
          ...state,
          score: state.score + 1,
          hasResponded: true,
        };

      case "wrong answer":
        return {
          ...state,
          hasResponded: true,
        };

      case "next question":
        return {
          ...state,
          actualQuestion: state.hasRestarted ? state.actualQuestion : state.actualQuestion + 1,

          responses: choices.responses,
          answer: choices.answer,

          hasResponded: false,
          hasRestarted: false,
        };

      case "open modale":
        setIsModaleOpened(true);
        return {
          ...state,
          gameModale: {
            ...state.gameModale,
            description: action.payload,
            confirmation: action.payload,
          },
        };

      case "restart":
        setIsModaleOpened(false);
        return { ...initialState, hasRestarted: true };

      default:
        return new Error("Action not found");
    }
  }

  return (
    <section className="quiz">
      <p>score: {score}</p>
      <p>
        question n°: {actualQuestion < nbOfQuestions ? actualQuestion : nbOfQuestions}/
        {nbOfQuestions}
      </p>

      <article className="game">
        {!isQuizfinished ? (
          <Game gameState={gameState} gameDispatch={gameDispatch} />
        ) : (
          <Result score={score} />
        )}
      </article>

      <Buttons isQuizfinished={isQuizfinished} dispatch={gameDispatch} />

      {isModaleOpened && (
        <Modale
          name="game"
          setIsModaleOpened={setIsModaleOpened}
          children={
            <GameModale
              setIsModaleOpened={setIsModaleOpened}
              gameModale={gameModale}
              gameDispatch={gameDispatch}
            />
          }
        />
      )}
    </section>
  );
}
