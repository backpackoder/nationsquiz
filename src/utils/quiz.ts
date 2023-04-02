export enum QuizLength {
  Ten = 0,
  Twenty = 1,
  Thirty = 2,
}
export const quizLength = [
  {
    label: "10",
    questions: 10,
  },
  {
    label: "20",
    questions: 20,
  },
  {
    label: "30",
    questions: 30,
  },
];

export enum Difficulty {
  Enfant = 0,
  Facile,
  Moyen,
  Difficile,
  Expert,
}
export const difficulty = [
  {
    label: "Enfant",
    choices: 2,
  },
  {
    label: "Facile",
    choices: 4,
  },
  {
    label: "Moyen",
    choices: 6,
  },
  {
    label: "Difficile",
    choices: 8,
  },
  {
    label: "Expert",
    choices: 10,
  },
];
