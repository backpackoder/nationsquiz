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

export type ResultProps = {
  score: number;
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

export type PopulationResultProps = {
  responses: any;
  index: number;
};
