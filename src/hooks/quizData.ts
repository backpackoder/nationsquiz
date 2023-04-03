import { useTranslation } from "react-i18next";

// Commons
import { CAPITALS, DEMOGRAPHY, FLAGS } from "../commons/commons";

export function useQuizData() {
  const { t } = useTranslation();

  const quizData = [
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
  ];

  return { quizData };
}
