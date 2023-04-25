// Types
import { API_DATA } from "./api";

// SEARCHBAR
export type SearchBarProps = {
  data: API_DATA[];
  filterDispatch: any;
};

// quiz
export type ButtonsProps = {
  dispatch: any;
  isQuizfinished: boolean;
};

export type ResultsProps = {
  score: number;
  time: number;
};

// GAME
export type GameProps = {
  gameState: any;
  gameDispatch: any;
};

export type CountryNameOfAnswerProps = {
  countryName: string;
};

export type FlagsOfResponsesProps = {
  responsesData: any;
};

export type DataRevealProps = {
  theme: string | undefined;
  responses: any;
  index: number;
};

// RESULTS
export type OnChangeSubmit = {
  type: string;
  value: string;
};
export type SubmitScoreProps = {
  score: number;
  time: number;
  onChangeSubmit: ({ type, value }: OnChangeSubmit) => void;
  submitScore: () => Promise<void>;
};

// RANKING
export type RankingProps = {
  score: number;
  time: number;
};
