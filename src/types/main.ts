// Context
export type AppProviderProps = {
  // Language
  actualLanguage: string;
  setActualLanguage: React.Dispatch<React.SetStateAction<string>>;

  // API
  isLoading: boolean;
  data: any;

  // Quiz
  isQuizSelected: boolean;
  setIsQuizSelected: React.Dispatch<React.SetStateAction<boolean>>;
  quizLength: {
    label: string;
    questions: number;
  }[];
  difficulty: {
    label: string;
    choices: number;
  }[];
  nbOfQuestions: number;
  setNbOfQuestions: React.Dispatch<React.SetStateAction<number>>;
  nbOfChoices: number;
  setNbOfChoices: React.Dispatch<React.SetStateAction<number>>;
};

// Languages
export type Iso = "fra" | "en" | "spa";

export type LanguageBtn = {
  language: Iso;
  flag: JSX.Element;
}[];
