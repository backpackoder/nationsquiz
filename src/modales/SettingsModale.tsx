import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../AppContext";
import { useTranslation } from "react-i18next";

// Types
import { QuizData } from "../types/quiz";

// Hooks
import { AppProviderProps } from "../types/context";
import { ROUTES, THEMES } from "../commons/commons";
import { Regions, SettingEnum } from "../types/settings";

type SettingsModaleProps = {
  quizTheme: QuizData;
  setIsModaleOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

export function SettingsModale({ quizTheme, setIsModaleOpened }: SettingsModaleProps) {
  const { settingsDispatch, settingsList }: AppProviderProps = useContext(AppContext);
  const { t } = useTranslation();

  const difficulty = settingsList[SettingEnum.Difficulty];
  const quizLength = settingsList[SettingEnum.QuizLength];
  const region = settingsList[SettingEnum.Region];

  const ROOT = "modale.settings";

  useEffect(() => {
    switch (quizTheme.theme) {
      case THEMES.BORDERS:
        if (region.value === Regions.Oceania) {
          settingsDispatch({
            type: "region not available for this theme",
            payload: Regions.All,
          });
        }
        break;

      default:
        break;
    }
  }, [quizTheme]);

  return (
    <>
      <h2>{t(`quizList.${quizTheme.theme}.title`)}</h2>

      <h3>{t(`${ROOT}.title`)}</h3>

      <div className="settings">
        <div className={`setting ${difficulty.setting.title}`}>
          <h4>{t(`${ROOT}.${difficulty.setting.title}.title`)}</h4>

          <div className="buttons">
            {difficulty.setting.values.map((item, index) => {
              return (
                <button
                  key={index}
                  className={difficulty.value === item.value ? "active" : "inactive"}
                  onClick={() =>
                    settingsDispatch({
                      type: difficulty.callDispatch,
                      payload: item.value,
                    })
                  }
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className={`setting ${quizLength.setting.title}`}>
          <h4>{t(`${ROOT}.${quizLength.setting.title}.title`)}</h4>

          <div className="buttons">
            {quizLength.setting.values.map((item, index) => {
              return (
                <button
                  key={index}
                  className={quizLength.value === item.value ? "active" : "inactive"}
                  onClick={() =>
                    settingsDispatch({
                      type: quizLength.callDispatch,
                      payload: item.value,
                    })
                  }
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className={`setting ${region.setting.title}`}>
          <h4>{t(`${ROOT}.${region.setting.title}.title`)}</h4>

          <div className="buttons">
            {region.setting.values.map((item, index) => {
              return (
                <button
                  key={index}
                  className={
                    quizTheme.theme === THEMES.BORDERS && index === Regions.Oceania
                      ? "hidden"
                      : region.value === item.value
                      ? "active"
                      : "inactive"
                  }
                  onClick={() =>
                    settingsDispatch({
                      type: region.callDispatch,
                      payload: item.value,
                    })
                  }
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <Link to={`${ROUTES.QUIZ_LIST}/${quizTheme.theme}`} onClick={() => setIsModaleOpened(false)}>
        {t(`${ROOT}.start`)}
      </Link>
    </>
  );
}
