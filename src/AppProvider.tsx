import { useEffect, useReducer, useState } from "react";
import { AppContext } from "./AppContext";
import { useQuery } from "react-query";
import axios from "axios";
import { i18n } from "./i18n";
import { useTranslation } from "react-i18next";

// Types
import { AppProviderProps } from "./types/context";
import { API_DATA } from "./types/api";
import {
  Difficulties,
  QuizLengths,
  Regions,
  SettingList,
  SettingObj,
  SettingsAction,
  SettingsState,
} from "./types/settings";

// Commons
import { API_LINK, SETTINGS } from "./commons/commons";

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
        value: "kid",
      },
      {
        label: t("modale.settings.difficulty.easy"),
        value: "easy",
      },
      {
        label: t("modale.settings.difficulty.medium"),
        value: "medium",
      },
      {
        label: t("modale.settings.difficulty.hard"),
        value: "hard",
      },
      {
        label: t("modale.settings.difficulty.expert"),
        value: "expert",
      },
    ],
  };

  const lengths: SettingObj = {
    title: SETTINGS.LENGTH,
    values: [
      {
        label: "short",
        value: "short",
      },
      {
        label: "normal",
        value: "normal",
      },
      {
        label: "long",
        value: "long",
      },
    ],
  };

  const regions: SettingObj = {
    title: SETTINGS.REGION,
    values: [
      {
        label: t("modale.settings.region.all"),
        value: "world",
      },
      {
        label: t("modale.settings.region.africa"),
        value: "africa",
      },
      {
        label: t("modale.settings.region.americas"),
        value: "americas",
      },
      {
        label: t("modale.settings.region.asia"),
        value: "asia",
      },
      {
        label: t("modale.settings.region.europe"),
        value: "europe",
      },
      {
        label: t("modale.settings.region.oceania"),
        value: "oceania",
      },
    ],
  };

  const savedSettings = localStorage.getItem("settings");

  const initialState: SettingsState =
    savedSettings !== null
      ? JSON.parse(savedSettings)
      : {
          nbOfChoices: difficulty.values[Difficulties.Easy].value,
          nbOfQuestions: lengths.values[QuizLengths.Twenty].value,
          regionChosen: regions.values[Regions.World].value,
        };

  const [settingsState, settingsDispatch] = useReducer(reducer, initialState);
  console.log("settingsState", settingsState);

  const settingsList: SettingList = [
    {
      setting: difficulty,
      value: settingsState.nbOfChoices,
      callDispatch: "change difficulty",
    },
    {
      setting: lengths,
      value: settingsState.nbOfQuestions,
      callDispatch: "change length",
    },
    { setting: regions, value: settingsState.regionChosen, callDispatch: "change region" },
  ];

  function reducer(state: SettingsState, action: SettingsAction) {
    switch (action.type) {
      case "change difficulty":
        return {
          ...state,
          nbOfChoices: action.payload.value,
        };

      case "change length":
        return {
          ...state,
          nbOfQuestions: action.payload.value,
        };

      case "change region":
        return {
          ...state,
          regionChosen: action.payload.value,
        };

      case "goToQuiz":
        return {
          ...state,
          nbOfChoices: action.payload.difficulty,
          nbOfQuestions: action.payload.length,
          regionChosen: action.payload.region,
        };

      case "region not available for this theme":
        return {
          ...state,
          regionChosen: action.payload.value,
        };

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
