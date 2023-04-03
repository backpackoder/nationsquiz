import { useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import axios from "axios";
import { i18n } from "./i18n";

// Types
import { AppProviderProps } from "./types/main";

// Hooks
import { Difficulty, QuizLength, useSettings } from "./hooks/settings";

export function AppProvider(props: object) {
  const { quizLength, difficulty } = useSettings();

  // Language
  const [actualLanguage, setActualLanguage] = useState(i18n.language);

  // API
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  // Quiz
  const [isQuizSelected, setIsQuizSelected] = useState(false);

  const [nbOfQuestions, setNbOfQuestions] = useState(quizLength[QuizLength.Twenty].questions);
  const [nbOfChoices, setNbOfChoices] = useState(difficulty[Difficulty.Easy].choices);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response: any) => {
        setData(response.data);
      })
      .catch((err: any) => {
        console.log("Fetch error: ", err);
      })
      .finally(function () {
        setIsLoading(false);
      });
  }, []);

  const contextValue: AppProviderProps = {
    // Language
    actualLanguage,
    setActualLanguage,

    // API
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
