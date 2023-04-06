import { useContext, useReducer, useState } from "react";
import { AppContext } from "../../AppContext";
import { Trans } from "react-i18next";

// Types
import { AppProviderProps } from "../../types/main";

// Components
import { Game } from "./Game";
import { Result } from "./Result";
import { Modale } from "../../modales/Modale";
import { GameModale } from "../../modales/GameModale";
import { Buttons } from "./Buttons";

export function Quiz() {
  const { data }: AppProviderProps = useContext(AppContext);

  return data && <QuizRunning />;
}

function QuizRunning() {
  const { data, nbOfQuestions, nbOfChoices }: AppProviderProps = useContext(AppContext);

  const [isModaleOpened, setIsModaleOpened] = useState(false);

  function getResponses() {
    const countriesList: any[] = data;
    const responses: any[] = [];

    for (let i = 0; i < nbOfChoices; i++) {
      const randomCountry = countriesList[Math.floor(Math.random() * countriesList.length)];
      responses.push(randomCountry);
      countriesList.splice(countriesList.indexOf(randomCountry), 1);
    }

    const randomAnswer = responses[Math.floor(Math.random() * responses.length)];
    const answer = {
      data: randomAnswer,
      index: responses.indexOf(randomAnswer),
    };
    console.log("responses", responses);
    console.log("answer", answer);

    return { responses, answer };
  }

  const results = getResponses();

  const initialState = {
    actualQuestion: 1,
    score: 0,

    responses: results.responses,
    answer: results.answer,

    hasResponded: false,
    isCorrect: false,

    gameModale: {
      description: "",
      confirmation: "",
    },
  };

  const [state, dispatch] = useReducer<React.Reducer<any, any>>(reducer, initialState);
  console.log("state response", state.responses);
  console.log("state answer", state.answer);

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

          responses: results.responses,
          answer: results.answer,

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
          question n°: {actualQuestion > nbOfQuestions ? nbOfQuestions : actualQuestion}/
          {nbOfQuestions}
        </p>
        <div onClick={() => getResponses()}>click</div>

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
