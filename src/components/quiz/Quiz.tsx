import { useContext, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { AppContext } from "../../AppContext";
import { useParams } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

// Types
import { AppProviderProps } from "../../types/context";

// Components
import { Game } from "./Game";
import { Buttons } from "./Buttons";
import { Modale } from "../../modales/Modale";
import { GameModale } from "../../modales/GameModale";

// Types
import { API_DATA } from "../../types/api";
import { GameState } from "../../types/quiz";

// Commons
import { MAX_RANKS_LIMIT, SUPABASE, THEMES } from "../../commons/commons";

// Utils
import { getCountriesList } from "../../utils/getCountriesList";
import { SubmitScore } from "../rankings/SubmitScore";
import { Rankings } from "../rankings/Rankings";
import { OnChangeSubmit } from "../../types/props";
import { QuizModeSentence } from "../QuizModeSentence";

type Answer = any;
// {
//   data: API_DATA;
//   index: number;
// }

const supabase = createClient(SUPABASE.LINK, SUPABASE.KEY);

export function Quiz() {
  const { theme } = useParams();
  const { data, settingsState }: AppProviderProps = useContext(AppContext);
  const { nbOfChoices, nbOfQuestions, regionChosen: region } = settingsState;

  const [isModaleOpened, setIsModaleOpened] = useState(false);
  const [pseudo, setPseudo] = useState(localStorage.getItem("pseudo") || "");
  const [nationality, setNationality] = useState(localStorage.getItem("nationality") || "");
  const [time, setTime] = useState(0);
  const [isNewRecord, setIsNewRecord] = useState(true);
  const [isScoreSubmitted, setIsScoreSubmitted] = useState(false);

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

  const infosToSubmit = {
    pseudo,
    nationality,
    score,
    time,
  };

  function reducer(state: any, action: any) {
    switch (action.type) {
      case "correct answer":
        return {
          ...state,
          score: state.score + 1,
          hasResponded: true,
          hasRestarted: false,
        };

      case "wrong answer":
        return {
          ...state,
          hasResponded: true,
          hasRestarted: false,
        };

      case "next question":
        return {
          ...state,
          actualQuestion: state.actualQuestion + 1,

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
        return { ...initialState, actualQuestion: 1, hasRestarted: true };

      default:
        return new Error("Action not found");
    }
  }

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

  function onChangeSubmit({ type, value }: OnChangeSubmit) {
    switch (type) {
      case "pseudo":
        setPseudo(value);
        localStorage.setItem("pseudo", value);
        break;
      case "nationality":
        setNationality(value);
        localStorage.setItem("nationality", value);
        break;
      default:
        break;
    }
  }

  async function getActualRecords() {
    const { data } = await supabase
      .from("rankings")
      .select()
      .eq("theme", theme)
      .eq("region", region)
      .eq("difficulty", nbOfChoices)
      .eq("length", nbOfQuestions)
      .order("score", { ascending: false })
      .order("time", { ascending: true })
      .order("date", { ascending: true });

    return data;
  }

  async function checkIfNewRecord() {
    const actualRecords = await getActualRecords();

    const worstRankedScore = actualRecords && actualRecords[actualRecords?.length - 1];

    if (actualRecords) {
      if (actualRecords.length < MAX_RANKS_LIMIT) {
        setIsNewRecord(true);
      } else {
        if (score > worstRankedScore?.score) {
          setIsNewRecord(true);
        } else if (score === worstRankedScore?.score && time < worstRankedScore?.time) {
          setIsNewRecord(true);
        } else {
          setIsNewRecord(false);
        }
      }
    }

    return isNewRecord;
  }

  async function submitScore() {
    if (pseudo === "") {
      alert("Please enter a pseudo");
    } else {
      const actualRecords = await getActualRecords();

      if (actualRecords && actualRecords.length >= MAX_RANKS_LIMIT) {
        for (let i = actualRecords?.length; i && i >= MAX_RANKS_LIMIT; i--) {
          const newActualRecords = await getActualRecords();
          const worstRankedScore =
            newActualRecords && newActualRecords[newActualRecords?.length - 1];
          await supabase
            .from("rankings")
            .delete()
            .match({ id: worstRankedScore && worstRankedScore.id });
        }
      }

      await supabase.from("rankings").insert([
        {
          pseudo,
          theme,
          region,
          difficulty: nbOfChoices,
          length: nbOfQuestions,
          score,
          time,
          nationality,
        },
      ]);
      setIsScoreSubmitted(true);
    }
  }

  useEffect(() => {
    if (!isQuizfinished) {
      const interval = setInterval(() => setTime(time + 1), 1000);
      return () => clearInterval(interval);
    }
  }, [time]);

  useEffect(() => {
    if (isQuizfinished) {
      checkIfNewRecord();
    }
  }, [isQuizfinished]);

  return (
    <section className="quiz">
      <QuizModeSentence settings={{ region, difficulty: nbOfChoices, length: nbOfQuestions }} />

      <p>
        Score: {score} | Time: {time}
      </p>

      <p>
        Question n°: {actualQuestion < lengthInNumbers ? actualQuestion : lengthInNumbers}/
        {lengthInNumbers}
      </p>

      <article className="game">
        {!isQuizfinished ? (
          <Game gameState={gameState} gameDispatch={gameDispatch} />
        ) : !isScoreSubmitted && isNewRecord ? (
          <SubmitScore
            infosToSubmit={infosToSubmit}
            onChangeSubmit={onChangeSubmit}
            submitScore={submitScore}
          />
        ) : (
          <>
            {isNewRecord
              ? "Votre score à été ajouté dans la liste des records."
              : "votre score n'entre pas dans la table des records."}
            <Rankings />
          </>
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
