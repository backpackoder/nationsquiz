// Main
export const TITLE = "Nations Quiz";

// Routes
export const ROUTES = {
  HOME: "/",
  LEARN: "/learn",
  INFOS: "/learn/infos/:country",
  QUIZ_LIST: "/quiz",
  GAME: "/quiz/:theme",
  PAGE_NOT_FOUND: "*",
};

// API
export const API_LINK = "https://restcountries.com/v3.1/all";

// Quiz themes
export const THEMES = {
  FLAGS: "flags",
  CAPITALS: "capitals",
  DEMOGRAPHY: "demography",
};

// Settings
export const SETTINGS = {
  DIFFICULTY: "difficulty",
  QUESTIONS: "questions",
  REGIONS: "regions",
};
