// Types
import { API_DATA } from "./api";
import { RankingsListOptions, getRankingsFilters } from "./rankings";

// SEARCHBAR
export type SearchBarProps = {
  data: API_DATA[];
  filterDispatch: any;
};

// quiz
export type ButtonsProps = {
  dispatch: any;
  isQuizfinished: boolean;
  setIsScoreSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
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
  infosToSubmit: {
    pseudo: string;
    nationality: string;
    score: number;
    time: number;
  };
  onChangeSubmit: ({ type, value }: OnChangeSubmit) => void;
  submitScore: () => Promise<void>;
};

// RANKINGS
export type RankingsListProps = {
  options: RankingsListOptions;
};

export type RankingProps = {
  score: number;
  time: number;
};

export type SearchBarRankingsProps = {
  rankingsFilters: getRankingsFilters;
  dispatch: React.Dispatch<any>;
};
