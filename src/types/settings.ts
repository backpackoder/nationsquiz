// Settings
export type SettingString = "difficulty" | "questions" | "regions";

export type Settings = {
  [key: string]: SettingString;
};

export type SettingObj = {
  title: string;
  values: {
    label: string;
    value: number;
  }[];
};

export type SettingsList = {
  setting: SettingObj;
  value: number;
  callDispatch: string;
}[];

export type SettingsState = {
  nbOfChoices: number;
  nbOfQuestions: number;
  regionChosen: number;
};

export type SettingsAction = {
  type: string;
  payload: number;
};

export enum SettingEnum {
  Difficulty = 0,
  QuizLength,
  Region,
}
export enum Difficulty {
  Kid = 0,
  Easy,
  Medium,
  Hard,
  Expert,
}
export enum QuizLength {
  Ten = 0,
  Twenty,
  Thirty,
}
export enum Regions {
  All = 0,
  Africa,
  Americas,
  Asia,
  Europe,
  Oceania,
}
