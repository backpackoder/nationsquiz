// Types
import { SettingsStrings } from "../types/main";

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
  TABLES: {
    RANKINGS: "rankings",
  },
};

// Local storage
export const LOCAL_STORAGE_ITEMS = {
  SETTINGS: "settings",
};

// Query keys
export const QUERY_KEYS = {
  NATIONS: "nations",
};

// Quiz themes
export const THEMES: { [key: string]: SettingsStrings["themes"] } = {
  FLAGS: "flags",
  CAPITALS: "capitals",
  DEMOGRAPHY: "demography",
  BORDERS: "borders",
  AREAS: "areas",
};

// Settings
export const SETTINGS: { [key: string]: SettingsStrings["settings"] } = {
  DIFFICULTY: "difficulty",
  LENGTH: "length",
  REGION: "region",
};

export const CONTINENTS: { [key: string]: SettingsStrings["regions"] } = {
  WORLD: "World",
  AFRICA: "Africa",
  AMERICAS: "Americas",
  ANTARCTIC: "Antarctic",
  ASIA: "Asia",
  EUROPE: "Europe",
  OCEANIA: "Oceania",
};

export const MAX_RANKS_LIMIT = 10;
