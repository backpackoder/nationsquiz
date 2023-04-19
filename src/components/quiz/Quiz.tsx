import { useContext, useReducer, useState } from "react";
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

  // BORDERS TESTS
  const mockAPI = [
    {
      name: {
        common: "France",
      },
      borders: ["ESP", "AND", "DEU", "ITA", "LUX", "MCO", "CHE", "BEL"],
      cca3: "FRA",
    },
    {
      name: {
        common: "Spain",
      },
      borders: ["AND", "FRA", "GIB", "PRT", "MAR"],
      cca3: "ESP",
    },
    {
      name: {
        common: "Germany",
      },
      borders: ["AUT", "BEL", "CZE", "DNK", "FRA", "LUX", "NLD", "POL", "CHE"],
      cca3: "DEU",
    },
    {
      name: {
        common: "Italy",
      },
      borders: ["AUT", "FRA", "SMR", "SVN", "CHE", "VAT"],
      cca3: "ITA",
    },
    {
      name: {
        common: "Portugal",
      },
      borders: ["ESP"],
      cca3: "PRT",
    },
    {
      name: {
        common: "Monaco",
      },
      borders: ["FRA"],
      cca3: "MCO",
    },
    {
      name: {
        common: "Luxembourg",
      },
      borders: ["BEL", "FRA", "DEU"],
      cca3: "LUX",
    },
    {
      name: {
        common: "Andorra",
      },
      borders: ["FRA", "ESP"],
      cca3: "AND",
    },
  ];

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

      const uniqueResponses = new Set(responses.map((country: any) => country.population));

      switch (theme) {
        case THEMES.DEMOGRAPHY:
          if (uniqueResponses.size === responses.length) {
            definedAnswer = getDefinedAnswer();
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

          function replaceCountry() {
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
              responses.splice(responses.indexOf(item), 1, replaceCountry()!)
            );
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
      const answer = responses[Math.floor(Math.random() * responses.length)];

      return answer;
    }

    function getDefinedAnswer() {
      const populations = responses.map((country: any) => country.population);
      const biggest = Math.max(...populations);
      const answerIndex = populations.findIndex((population: any) => population === biggest);
      const answer = responses[answerIndex];

      return answer;
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
    isCorrect: false,

    gameModale: {
      description: "",
      confirmation: "",
    },
  };

  const [gameState, gameDispatch] = useReducer<React.Reducer<any, any>>(reducer, initialState);

  const { actualQuestion, score, gameModale } = gameState;

  const isQuizfinished = actualQuestion > nbOfQuestions;

  function reducer(state: any, action: any) {
    switch (action.type) {
      case "correct answer":
        return { ...state, score: state.score + 1, hasResponded: true, isCorrect: true };

      case "wrong answer":
        return { ...state, hasResponded: true, isCorrect: false };

      case "next question":
        return {
          ...state,
          actualQuestion: state.actualQuestion + 1,

          responses: choices.responses,
          answer: choices.answer,

          hasResponded: false,
          isCorrect: false,
        };

      case "open modale":
        setIsModaleOpened(true);
        return {
          ...state,
          gameModale: {
            ...state.gameModale,
            description: (
              <Trans
                components={{ br: <br /> }}
              >{`modale.game.description.${action.payload}`}</Trans>
            ),
            confirmation: action.payload,
          },
        };

      case "restart":
        setIsModaleOpened(false);
        return initialState;

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

      {/* <p>
        TESTS:
        <br />
        countriesWithBorders: {countriesWithBorders?.length}
        <br />
        nameOfResponse: {nameOfResponse}
        <br />
        bordersOfResponse: {bordersOfResponse.join(", ")}
        <br />
        bordersFullNames: {bordersFullNames}
        <br />
        randomBorderFromResponse: {randomBorderFromResponse}
        <br />
        countriesNotBorderingList: {countriesNotBorderingList.length}
        <br />
        countriesNotBorderingListString: {countriesNotBorderingListString}
      </p> */}
    </section>
  );
}
