// Types
import { Themes } from "../types/main";

// Main
export const TITLE = "Nations Quiz";

// Routes
export const ROUTES = {
  HOME: "/",
  STUDY: "study/",
  INFOS: {
    ROOT: "infos/",
    ID: ":country/",
  },
  QUIZ: {
    ROOT: "quiz/",
    ID: ":theme/",
  },
  RANKINGS: "rankings/",
  PAGE_NOT_FOUND: "*",
};

// API
export const API_LINK = "https://restcountries.com/v3.1/all";

// Supabase
export const SUPABASE = {
  LINK: "https://adtjkhdrwrvgptkqxmrf.supabase.co",
  KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkdGpraGRyd3J2Z3B0a3F4bXJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODIzMzAxMDMsImV4cCI6MTk5NzkwNjEwM30.ZmeNo3hArgs65MGRIgF5cj-fxuFN8R9UARWMTIGqgds",
};

// Quiz themes
export const THEMES: { [key: string]: Themes } = {
  FLAGS: "flags",
  CAPITALS: "capitals",
  DEMOGRAPHY: "demography",
  BORDERS: "borders",
  AREAS: "areas",
};

// Settings
export const SETTINGS = {
  DIFFICULTY: "difficulty",
  LENGTH: "length",
  REGION: "region",
};

export const CONTINENTS = {
  WORLD: "World",
  AFRICA: "Africa",
  AMERICAS: "Americas",
  ANTARCTIC: "Antarctic",
  ASIA: "Asia",
  EUROPE: "Europe",
  OCEANIA: "Oceania",
};

export const MAX_RANKS_LIMIT = 10;
