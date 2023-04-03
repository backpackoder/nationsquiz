import { useContext, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext";
import { useTranslation } from "react-i18next";

// Types
import { AppProviderProps } from "../../types/main";

// Commons
import { ROUTES } from "../../commons/commons";

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
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [isModaleOpened, setIsModaleOpened] = useState(false);

  const countriesList: any[] = [];
  if (data) {
    data.map((item: any) => {
      countriesList.push(item.cca2);
    });
  }

  function getRandomCorrectResponse() {
    return Math.floor(Math.random() * data.length);
  }
  const randomCorrectResponseLocation = Math.floor(Math.random() * nbOfChoices);

  function getWrongResponsesList() {
    const array = [];
    for (let i = 0; i < nbOfChoices; i++) {
      array.push(getRandomWrongResponse());
    }

    return array;
  }

  function getRandomWrongResponse() {
    const randomCountry = Math.floor(Math.random() * countriesList.length);
    const countryChosen = countriesList[randomCountry];
    const findCountryIndex = data.findIndex((item: any) => item.cca2 === countryChosen);

    countriesList.splice(randomCountry, 1);

    return findCountryIndex;
  }

  const initialState = {
    actualQuestion: 1,
    score: 0,

    correctResponseData: data[getRandomCorrectResponse()],
    correctResponseRandomIndex: randomCorrectResponseLocation,

    wrongResponsesData: getWrongResponsesList(),

    hasResponded: false,
    isCorrect: false,

    gameModale: {
      description: "",
      confirmation: "",
    },
  };

  const [state, dispatch] = useReducer<React.Reducer<any, any>>(reducer, initialState);

  const { actualQuestion, score, correctResponseData, correctResponseRandomIndex, gameModale } =
    state;

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

          correctResponseData: data[getRandomCorrectResponse()],
          correctResponseRandomIndex: randomCorrectResponseLocation,

          wrongResponsesData: getWrongResponsesList(),

          hasResponded: false,
          isCorrect: false,
        };

      case "open modale":
        setIsModaleOpened(true);
        return {
          ...state,
          gameModale: {
            ...state.gameModale,
            description:
              action.payload === "restart"
                ? t("modale.game.description.restart")
                : t("modale.game.description.leave"),
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

  if (data) {
    const search = countriesList.findIndex((item: any) => item === correctResponseData?.cca2);
    if (search !== -1) {
      countriesList.splice(search, 1);
    }
  }

  return (
    data && (
      <section className="quiz">
        <p>score: {score}</p>
        <p>
          question n°: {actualQuestion}/{nbOfQuestions}
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
            name="quizRunning"
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
