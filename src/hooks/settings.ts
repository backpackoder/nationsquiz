import { useContext } from "react";
import { AppContext } from "../AppContext";
import { useTranslation } from "react-i18next";

// Commons
import { SETTINGS } from "../commons/commons";

type Settings = {
  title: string;
  values: {
    label: string;
    value: number;
  }[];
};

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
export enum Regions {
  All = 0,
  Africa,
  Americas,
  Asia,
  Europe,
  Oceania,
}

export function useSettings() {
  const {
    nbOfChoices,
    setNbOfChoices,
    nbOfQuestions,
    setNbOfQuestions,
    regionChosen,
    setRegionChosen,
  } = useContext(AppContext);
  const { t } = useTranslation();

  const difficulty: Settings = {
    title: SETTINGS.DIFFICULTY,
    values: [
      {
        label: t("modale.settings.difficulty.kid"),
        value: 2,
      },
      {
        label: t("modale.settings.difficulty.easy"),
        value: 4,
      },
      {
        label: t("modale.settings.difficulty.medium"),
        value: 6,
      },
      {
        label: t("modale.settings.difficulty.hard"),
        value: 8,
      },
      {
        label: t("modale.settings.difficulty.expert"),
        value: 10,
      },
    ],
  };

  const quizLength: Settings = {
    title: SETTINGS.QUESTIONS,
    values: [
      {
        label: "10",
        value: 10,
      },
      {
        label: "20",
        value: 20,
      },
      {
        label: "30",
        value: 30,
      },
    ],
  };

  const regions: Settings = {
    title: SETTINGS.REGIONS,
    values: [
      {
        label: t("modale.settings.regions.all"),
        value: 0,
      },
      {
        label: t("modale.settings.regions.africa"),
        value: 1,
      },
      {
        label: t("modale.settings.regions.americas"),
        value: 2,
      },
      {
        label: t("modale.settings.regions.asia"),
        value: 3,
      },
      {
        label: t("modale.settings.regions.europe"),
        value: 4,
      },
      {
        label: t("modale.settings.regions.oceania"),
        value: 5,
      },
    ],
  };

  const settings = [
    { setting: difficulty, value: nbOfChoices, changeValue: setNbOfChoices },
    { setting: quizLength, value: nbOfQuestions, changeValue: setNbOfQuestions },
    { setting: regions, value: regionChosen, changeValue: setRegionChosen },
  ];

  return { settings, quizLength, difficulty, regions };
}
