import { useEffect, useReducer, useState } from "react";
import { AppContext } from "./AppContext";
import { useQuery } from "react-query";
import axios from "axios";
import { i18n } from "./i18n";
import { useTranslation } from "react-i18next";

// Types
import { API_DATA } from "./types/api";
import {
  Difficulty,
  QuizLength,
  Regions,
  SettingObj,
  SettingsAction,
  SettingsList,
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
  const { status, error, data } = useQuery({
    queryKey: ["nations"],
    queryFn: () => axios.get<API_DATA[]>(API_LINK).then((res) => res.data),
  });

  const difficulty: SettingObj = {
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

  const quizLength: SettingObj = {
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

  const regions: SettingObj = {
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

  const savedSettings = localStorage.getItem("settings");

  const initialState: SettingsState =
    savedSettings !== null
      ? JSON.parse(savedSettings)
      : {
          nbOfChoices: difficulty.values[Difficulty.Easy].value,
          nbOfQuestions: quizLength.values[QuizLength.Twenty].value,
          regionChosen: regions.values[Regions.All].value,
        };

  const [settingsState, settingsDispatch] = useReducer(reducer, initialState);

  const settingsList: SettingsList = [
    {
      setting: difficulty,
      value: settingsState.nbOfChoices,
      callDispatch: "change choices",
    },
    {
      setting: quizLength,
      value: settingsState.nbOfQuestions,
      callDispatch: "change questions",
    },
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

      case "region not available for this theme":
        return { ...state, regionChosen: action.payload };

      default:
        throw new Error("Unexpected settings action");
    }
  }

  function updateLocalStorage(state: any) {
    localStorage.setItem("settings", JSON.stringify(state));
  }

  useEffect(() => {
    updateLocalStorage(settingsState);
  }, [settingsState]);

  const contextValue: AppProviderProps = {
    // Language
    actualLanguage,
    setActualLanguage,

    // API
    status,
    data,
    error,

    // Settings
    settingsList,
    settingsState,
    settingsDispatch,
  };

  return <AppContext.Provider {...props} value={contextValue} />;
}
