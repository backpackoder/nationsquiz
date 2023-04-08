// Context
export type AppProviderProps = {
  // Language
  actualLanguage: string;
  setActualLanguage: React.Dispatch<React.SetStateAction<string>>;

  // API
  isLoading: boolean;
  data: any;

  // Settings
  nbOfChoices: number;
  setNbOfChoices: React.Dispatch<React.SetStateAction<number>>;
  nbOfQuestions: number;
  setNbOfQuestions: React.Dispatch<React.SetStateAction<number>>;
  regionChosen: number;
  setRegionChosen: React.Dispatch<React.SetStateAction<number>>;

  // Quiz
  isQuizSelected: boolean;
  setIsQuizSelected: React.Dispatch<React.SetStateAction<boolean>>;
};

// Languages
export type Iso = "fra" | "en" | "spa";

export type LanguageBtn = {
  language: Iso;
  flag: JSX.Element;
}[];
