import { useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import axios from "axios";
import { i18n } from "./i18n";

// Types
import { AppProviderProps } from "./types/main";

// Hooks
import { Regions, Difficulty, QuizLength, useSettings } from "./hooks/settings";

export function AppProvider(props: object) {
  const { difficulty, quizLength, regions } = useSettings();

  // Language
  const [actualLanguage, setActualLanguage] = useState(i18n.language);

  // API
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  // Settings
  const [nbOfChoices, setNbOfChoices] = useState(difficulty.values[Difficulty.Easy].value);
  const [nbOfQuestions, setNbOfQuestions] = useState(quizLength.values[QuizLength.Twenty].value);
  const [regionChosen, setRegionChosen] = useState(regions.values[Regions.All].value);

  // Quiz
  const [isQuizSelected, setIsQuizSelected] = useState(false);

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

    // Settings
    nbOfChoices,
    setNbOfChoices,
    nbOfQuestions,
    setNbOfQuestions,
    regionChosen,
    setRegionChosen,

    // Quiz
    isQuizSelected,
    setIsQuizSelected,
  };

  return <AppContext.Provider {...props} value={contextValue} />;
}
