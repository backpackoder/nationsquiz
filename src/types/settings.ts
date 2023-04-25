// Settings
export type SettingString = "difficulty" | "length" | "regions";

export type Settings = {
  [key: string]: SettingString;
};

export type SettingObj = {
  title: string;
  values: {
    label: string;
    value: string;
  }[];
};

export type SettingList = {
  setting: SettingObj;
  value: string;
  callDispatch: string;
}[];

export type SettingsState = {
  nbOfChoices: string;
  nbOfQuestions: string;
  regionChosen: string;
};

export type SettingsAction = {
  type: string;
  payload: SettingsActionPayload;
};

export type SettingsActionPayload = {
  [key: string]: string;
};

export enum SettingEnum {
  Difficulty = 0,
  QuizLength,
  Region,
}
export enum Difficulties {
  Kid = 0,
  Easy,
  Medium,
  Hard,
  Expert,
}
export enum QuizLengths {
  Ten = 0,
  Twenty,
  Thirty,
}
export enum Regions {
  World = 0,
  Africa,
  Americas,
  Asia,
  Europe,
  Oceania,
}
