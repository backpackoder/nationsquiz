// Types
import { Themes } from "../types/main";

// Main
export const TITLE = "Nations Quiz";

// Routes
export const ROUTES = {
  HOME: "/",
  STUDY: "/study",
  INFOS: "/study/infos/:country",
  QUIZ_LIST: "/quiz",
  GAME: "/quiz/:theme",
  PAGE_NOT_FOUND: "*",
};

// API
export const API_LINK = "https://restcountries.com/v3.1/all";

// Quiz themes
export const THEMES: { [key: string]: Themes } = {
  FLAGS: "flags",
  CAPITALS: "capitals",
  DEMOGRAPHY: "demography",
  BORDERS: "borders",
};

// Settings
export const SETTINGS = {
  DIFFICULTY: "difficulty",
  QUESTIONS: "questions",
  REGIONS: "regions",
};

export const CONTINENTS = {
  AFRICA: "Africa",
  AMERICAS: "Americas",
  ANTARCTIC: "Antarctic",
  ASIA: "Asia",
  EUROPE: "Europe",
  OCEANIA: "Oceania",
};
