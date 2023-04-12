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
    index: any;
  };
  hasResponded: boolean;
  isCorrect: boolean;
  gameModale: {
    description: string;
    confirmation: string;
  };
};
