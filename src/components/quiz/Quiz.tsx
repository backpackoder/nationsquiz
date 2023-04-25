import { useContext, useMemo, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../AppContext";

// Types
import { AppProviderProps } from "../../types/context";

// Components
import { Game } from "./Game";
import { Results } from "./Results";
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
  const [time, setTime] = useState(0);

  function getResponses() {
    const countriesList = data && getCountriesList({ data, theme, region });
    let responses: API_DATA[] = [];
    let definedAnswer, randomAnswer, answer: Answer;

    const difficulty = useMemo(() => {
      switch (nbOfChoices) {
        case "kid":
          return 2;

        case "easy":
          return 4;

        case "medium":
          return 6;

        case "hard":
          return 8;

        case "expert":
          return 10;

        default:
          throw new Error("nbOfChoices not found");
      }
    }, [nbOfChoices]);

    do {
      for (let i = 0; i < difficulty; i++) {
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

  const lengthInNumbers = useMemo(() => {
    switch (nbOfQuestions) {
      case "short":
        return 10;

      case "normal":
        return 20;

      case "long":
        return 30;

      default:
        return 10;
    }
  }, [nbOfQuestions]);

  const isQuizfinished = actualQuestion > lengthInNumbers;

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
        setTime(0);
        return { ...initialState, hasRestarted: true };

      default:
        return new Error("Action not found");
    }
  }

  !isQuizfinished &&
    setTimeout(() => {
      setTime(time + 1);
    }, 1000);

  return (
    <section className="quiz">
      <p>
        Theme: {theme} | Difficulty: {nbOfChoices} | Region: {region} | Length: {nbOfQuestions} |
        Score: {score} | Time: {time}
      </p>

      <p>
        Question n°: {actualQuestion < lengthInNumbers ? actualQuestion : lengthInNumbers}/
        {lengthInNumbers}
      </p>

      <article className="game">
        {!isQuizfinished ? (
          <Game gameState={gameState} gameDispatch={gameDispatch} />
        ) : (
          <Results score={score} time={time} />
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
