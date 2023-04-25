// Types
import { API_DATA } from "./api";
import { SettingList, SettingsAction, SettingsState } from "./settings";

// Context
export type AppProviderProps = {
  // Language
  actualLanguage: string;
  setActualLanguage: React.Dispatch<React.SetStateAction<string>>;

  // API
  status: "idle" | "error" | "loading" | "success";
  data: API_DATA[] | undefined;
  error: unknown;

  // Settings
  settingsList: SettingList;
  settingsState: SettingsState;
  settingsDispatch: React.Dispatch<SettingsAction>;
};
