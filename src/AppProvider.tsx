import { useEffect, useReducer, useState } from "react";
import { AppContext } from "./AppContext";
import axios from "axios";
import { i18n } from "./i18n";
import { useTranslation } from "react-i18next";

// Types
import {
  AllSettings,
  Difficulty,
  QuizLength,
  Regions,
  Setting,
  SettingsAction,
  SettingsState,
} from "./types/settings";

// Commons
import { API_LINK, SETTINGS } from "./commons/commons";
import { AppProviderProps } from "./types/context";

export function AppProvider(props: object) {
  const { t } = useTranslation();

  // Language
  const [actualLanguage, setActualLanguage] = useState(i18n.language);

  // API
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    axios
      .get(API_LINK)
      .then((response: any) => {
        setData(response.data);
      })
      .catch((err: any) => {
        console.log("Fetch error: ", err);
      })
      .finally(function () {
        setIsLoading(false);
      });
  }, []);

  const difficulty: Setting = {
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

  const quizLength: Setting = {
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

  const regions: Setting = {
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

  const initialState: SettingsState = {
    nbOfChoices: difficulty.values[Difficulty.Easy].value,
    nbOfQuestions: quizLength.values[QuizLength.Twenty].value,
    regionChosen: regions.values[Regions.All].value,
  };

  const [settingsState, settingsDispatch] = useReducer<React.Reducer<any, any>>(
    reducer,
    initialState
  );

  const allSettings: AllSettings = [
    { setting: difficulty, value: settingsState.nbOfChoices, callDispatch: "change choices" },
    { setting: quizLength, value: settingsState.nbOfQuestions, callDispatch: "change questions" },
    { setting: regions, value: settingsState.regionChosen, callDispatch: "change region" },
  ];

  function reducer(state: SettingsState, action: SettingsAction) {
    switch (action.type) {
      case "change choices":
        return { ...state, nbOfChoices: action.payload };

      case "change questions":
        return { ...state, nbOfQuestions: action.payload };

      case "change region":
        return { ...state, regionChosen: action.payload };

      default:
        throw new Error("Unexpected settings action");
    }
  }

  const contextValue: AppProviderProps = {
    // Language
    actualLanguage,
    setActualLanguage,

    // API
    isLoading,
    data,

    // Settings
    allSettings,
    settingsState,
    settingsDispatch,
  };

  return <AppContext.Provider {...props} value={contextValue} />;
}
