// Types
import { API_DATA } from "./api";

export type QuizData = {
  theme: string;
  title: string;
  description: string;
};

export type GameState = {
  actualQuestion: number;
  score: number;
  responses: any;
  answer: Answer;
  hasResponded: boolean;
  gameModale: GameModale;
  hasRestarted: boolean;
};

export type Answer = {
  data: any;
  index: number;
};

export type GameModale = {
  description: string;
  confirmation: string;
};

export type ResponsesDataType = {
  text?: string;
  png?: string;
  alt?: string;
} | null;
