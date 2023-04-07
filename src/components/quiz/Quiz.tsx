import { useContext, useEffect, useMemo, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../AppContext";
import { Trans } from "react-i18next";

// Types
import { AppProviderProps } from "../../types/main";

// Components
import { Game } from "./Game";
import { Result } from "./Result";
import { Buttons } from "./Buttons";
import { Modale } from "../../modales/Modale";
import { GameModale } from "../../modales/GameModale";
import { THEMES } from "../../commons/commons";

export function Quiz() {
  const { data }: AppProviderProps = useContext(AppContext);

  return data && <QuizRunning />;
}

function QuizRunning() {
  const { theme } = useParams();
  const { data, nbOfQuestions, nbOfChoices }: AppProviderProps = useContext(AppContext);

  const [isModaleOpened, setIsModaleOpened] = useState(false);

  function getCountriesList() {
    switch (theme) {
      case THEMES.FLAGS:
        return data.filter((country: any) => country.cca2 !== undefined);

      case THEMES.CAPITALS:
        return data.filter((country: any) => country.capital !== undefined);

      case THEMES.DEMOGRAPHY:
        return data.filter((country: any) => country.population !== undefined);

      default:
        throw new Error("Theme not found");
    }
  }

  function getResponses() {
    const countriesList = getCountriesList();
    const responses: any[] = [];

    for (let i = 0; i < nbOfChoices; i++) {
      const randomCountry = countriesList[Math.floor(Math.random() * countriesList.length)];
      responses.push(randomCountry);
      countriesList.splice(countriesList.indexOf(randomCountry), 1);
    }

    function getDefinedAnswer() {
      const populations = responses.map((country: any) => country.population);
      const biggest = Math.max(...populations);
      const index = populations.findIndex((population: any) => population === biggest);
      const answer = responses[index];

      return answer;
    }
    const definedAnswer = getDefinedAnswer();

    function getRandomAnswer() {
      const answer = responses[Math.floor(Math.random() * responses.length)];

      return answer;
    }
    const randomAnswer = getRandomAnswer();

    const answer = {
      data: theme === THEMES.DEMOGRAPHY ? definedAnswer : randomAnswer,
      index: responses.indexOf(theme === THEMES.DEMOGRAPHY ? definedAnswer : randomAnswer),
    };

    return { responses, answer };
  }

  const choices = getResponses();

  const initialState = {
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

  const [state, dispatch] = useReducer<React.Reducer<any, any>>(reducer, initialState);

  const { actualQuestion, score, gameModale } = state;

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
    data && (
      <section className="quiz">
        <p>score: {score}</p>
        <p>
          question n°: {actualQuestion < nbOfQuestions ? actualQuestion : nbOfQuestions}/
          {nbOfQuestions}
        </p>

        <article className="game">
          {!isQuizfinished ? (
            <Game isQuizfinished={isQuizfinished} state={state} dispatch={dispatch} />
          ) : (
            <Result score={score} />
          )}
        </article>

        <Buttons isQuizfinished={isQuizfinished} dispatch={dispatch} />

        {isModaleOpened && (
          <Modale
            name="game"
            setIsModaleOpened={setIsModaleOpened}
            children={
              <GameModale
                setIsModaleOpened={setIsModaleOpened}
                gameModale={gameModale}
                dispatch={dispatch}
              />
            }
          />
        )}
      </section>
    )
  );
}
