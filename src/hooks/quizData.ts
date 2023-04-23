import { useTranslation } from "react-i18next";

// Types
import { QuizData } from "../types/quiz";

// Commons
import { THEMES } from "../commons/commons";

export function useQuizData() {
  const { t } = useTranslation();
  const { FLAGS, CAPITALS, DEMOGRAPHY, BORDERS, AREAS } = THEMES;

  const quizData: QuizData[] = [
    {
      theme: FLAGS,
      title: t(`quizList.${FLAGS}.title`),
      description: t(`quizList.${FLAGS}.description`),
    },
    {
      theme: CAPITALS,
      title: t(`quizList.${CAPITALS}.title`),
      description: t(`quizList.${CAPITALS}.description`),
    },
    {
      theme: DEMOGRAPHY,
      title: t(`quizList.${DEMOGRAPHY}.title`),
      description: t(`quizList.${DEMOGRAPHY}.description`),
    },
    {
      theme: BORDERS,
      title: t(`quizList.${BORDERS}.title`),
      description: t(`quizList.${BORDERS}.description`),
    },
    {
      theme: AREAS,
      title: t(`quizList.${AREAS}.title`),
      description: t(`quizList.${AREAS}.description`),
    },
  ];

  return quizData;
}
