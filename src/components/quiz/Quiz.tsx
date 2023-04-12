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

// Commons
import { THEMES } from "../../commons/commons";

// Utils
import { getCountriesList } from "../../utils/getCountriesList";
import { GameState } from "../../types/quiz";

export function Quiz() {
  const { theme } = useParams();
  const { data, settingsState }: AppProviderProps = useContext(AppContext);
  const { nbOfChoices, nbOfQuestions, regionChosen } = settingsState;

  const [isModaleOpened, setIsModaleOpened] = useState(false);

  function getResponses() {
    const countriesList = getCountriesList({ data, theme, region: regionChosen });
    let responses: any = [];
    let definedAnswer, randomAnswer, answer;

    do {
      for (let i = 0; i < nbOfChoices; i++) {
        const randomCountry = countriesList[Math.floor(Math.random() * countriesList.length)];
        responses.push(randomCountry);
        countriesList.splice(countriesList.indexOf(randomCountry), 1);
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

        default:
          randomAnswer = getRandomAnswer();
          answer = {
            data: randomAnswer,
            index: responses.indexOf(randomAnswer),
          };
          break;
      }
    } while (!answer);

    function getDefinedAnswer() {
      const populations = responses.map((country: any) => country.population);
      const biggest = Math.max(...populations);
      const answerIndex = populations.findIndex((population: any) => population === biggest);
      const answer = responses[answerIndex];

      return answer;
    }

    function getRandomAnswer() {
      const answer = responses[Math.floor(Math.random() * responses.length)];

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
          <Game isQuizfinished={isQuizfinished} gameState={gameState} gameDispatch={gameDispatch} />
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
