export type QuizData = {
  theme: string;
  title: string;
  description: string;
};

export type GameState = {
  actualQuestion: number;
  score: number;
  responses: any;
  answer: {
    data: any;
    index: number;
  };
  hasResponded: boolean;
  isCorrect: boolean;
  gameModale: {
    description: string;
    confirmation: string;
  };
};

export type ResponsesStringType = {
  text?: string;
  png?: string;
  alt?: string;
} | null;
