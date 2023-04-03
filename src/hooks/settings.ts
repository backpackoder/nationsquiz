import { useTranslation } from "react-i18next";

export enum QuizLength {
  Ten = 0,
  Twenty = 1,
  Thirty = 2,
}
export enum Difficulty {
  Kid = 0,
  Easy,
  Medium,
  Hard,
  Expert,
}

export function useSettings() {
  const { t } = useTranslation();

  const difficulty = [
    {
      label: t("modale.settings.difficulty.kid"),
      choices: 2,
    },
    {
      label: t("modale.settings.difficulty.easy"),
      choices: 4,
    },
    {
      label: t("modale.settings.difficulty.medium"),
      choices: 6,
    },
    {
      label: t("modale.settings.difficulty.hard"),
      choices: 8,
    },
    {
      label: t("modale.settings.difficulty.expert"),
      choices: 10,
    },
  ];

  const quizLength = [
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

  return { quizLength, difficulty };
}
