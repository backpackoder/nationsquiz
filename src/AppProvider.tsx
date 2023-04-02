import { useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import axios from "axios";

// Types
import { AppProviderProps } from "./types/main";

// Utils
import { Difficulty, QuizLength, difficulty, quizLength } from "./utils/settings";

export function AppProvider(props: object) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  const [isQuizSelected, setIsQuizSelected] = useState(false);

  // Quiz
  const [nbOfQuestions, setNbOfQuestions] = useState(quizLength[QuizLength.Twenty].questions);
  const [nbOfChoices, setNbOfChoices] = useState(difficulty[Difficulty.Easy].choices);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response: any) => {
        setData(response.data);
        console.log("response.data: ", response.data);
      })
      .catch((err: any) => {
        console.log("Fetch error: ", err);
      })
      .finally(function () {
        setIsLoading(false);
      });
  }, []);

  const contextValue: AppProviderProps = {
    isLoading,
    data,

    // Quiz
    isQuizSelected,
    setIsQuizSelected,
    quizLength,
    difficulty,
    nbOfQuestions,
    setNbOfQuestions,
    nbOfChoices,
    setNbOfChoices,
  };

  return <AppContext.Provider {...props} value={contextValue} />;
}
