import { useContext, useReducer, useState } from "react";
import { AppContext } from "../../AppContext";

// Types
import { AppProviderProps } from "../../types/main";

// Components
import { Result } from "./Result";
import { Modale } from "../../modales/Modale";
import { GameModale } from "../../modales/GameModale";
import { useNavigate } from "react-router-dom";

export function Quiz() {
  const { data, nbOfQuestions, nbOfChoices }: AppProviderProps = useContext(AppContext);
  const navigate = useNavigate();

  const [isModaleOpened, setIsModaleOpened] = useState(false);

  const countriesList: any[] = [];
  if (data) {
    data.map((item: any) => {
      countriesList.push(item.cca2);
    });
  }

  const randomResponseLocation = Math.floor(Math.random() * nbOfChoices);

  function getWrongResponsesList() {
    const array = [];

    for (let i = 0; i < nbOfChoices; i++) {
      array.push(getRandomWrongResponse());
    }

    return array;
  }

  const initialState = {
    actualQuestion: 1,
    score: 0,

    correctResponseData: data[getRandomCorrectResponse()],
    correctResponseRandomIndex: randomResponseLocation,

    wrongResponsesData: getWrongResponsesList(),

    hasResponded: false,
    isCorrect: false,

    gameModale: {
      description: "",
      confirmation: "",
    },
  };

  const [state, dispatch] = useReducer<React.Reducer<any, any>>(reducer, initialState);

  const {
    actualQuestion,
    score,
    correctResponseData,
    correctResponseRandomIndex,
    wrongResponsesData,
    hasResponded,
    isCorrect,
    gameModale,
  } = state;
  console.log("gameModale", gameModale);

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
          correctResponseRandomIndex: randomResponseLocation,

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
                ? "Etes-vous sûr de vouloir recommencer le quiz (votre progression sera perdue) ?"
                : "Etes-vous sûr de vouloir quitter le quiz (votre progression sera perdue) ?",
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

  function getRandomCorrectResponse() {
    return Math.floor(Math.random() * data.length);
  }

  function getRandomWrongResponse() {
    const randomCountry = Math.floor(Math.random() * countriesList.length);
    const countryChosen = countriesList[randomCountry];
    const findCountryIndex = data.findIndex((item: any) => item.cca2 === countryChosen);

    countriesList.splice(randomCountry, 1);

    return findCountryIndex;
  }

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
    data && (
      <section className="quiz">
        <h2>Quiz principal</h2>
        <p>score: {score}</p>
        <p>
          question n°: {actualQuestion}/{nbOfQuestions}
        </p>

        <article className="game">
          {!isQuizfinished ? (
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
                        {response.name?.common}
                      </li>
                    );
                  })}
              </ul>
            </>
          ) : (
            <Result dispatch={dispatch} score={score} />
          )}
        </article>

        <div className="buttons">
          <button
            className="restart"
            onClick={() =>
              dispatch({ type: isQuizfinished ? "restart" : "open modale", payload: "restart" })
            }
          >
            Recommencer
          </button>

          <button
            className="leave"
            onClick={() =>
              isQuizfinished
                ? navigate("/quiz")
                : dispatch({ type: "open modale", payload: "leave" })
            }
          >
            Quitter la partie
          </button>
        </div>

        {isModaleOpened && (
          <Modale
            modale="quizRunning"
            children={
              <GameModale
                dispatch={dispatch}
                gameModale={gameModale}
                setIsModaleOpened={setIsModaleOpened}
              />
            }
            setIsModaleOpened={setIsModaleOpened}
          />
        )}
      </section>
    )
  );
}
