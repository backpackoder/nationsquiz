import { API_DATA } from "./api";

export type QuizData = {
  theme: string;
  title: string;
  description: string;
};

export type GameState = {
  actualQuestion: number;
  score: number;
  responses: API_DATA[];
  answer: {
    data: API_DATA;
    index: number;
  };
  hasResponded: boolean;
  isCorrect: boolean;
  gameModale: {
    description: string;
    confirmation: string;
  };
};
