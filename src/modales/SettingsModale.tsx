import { useContext, useEffect } from "react";
import { AppContext } from "../AppContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Types
import { SettingsModaleProps } from "../types/props";
import { Regions, SettingEnum } from "../types/settings";

// Hooks
import { AppProviderProps } from "../types/context";

// Commons
import { CONTINENTS, ROUTES, THEMES } from "../commons/commons";

export function SettingsModale({ quizTheme, setIsModaleOpened }: SettingsModaleProps) {
  const navigate = useNavigate();
  const { settingsDispatch, settingsList }: AppProviderProps = useContext(AppContext);
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const difficulty = settingsList[SettingEnum.Difficulty];
  const quizLength = settingsList[SettingEnum.QuizLength];
  const region = settingsList[SettingEnum.Region];

  const T_ROOT = "modale.settings";

  function goToQuiz() {
    setIsModaleOpened(false);
    navigate(
      pathname === ROUTES.HOME ? `${ROUTES.QUIZ.ROOT}${quizTheme.theme}` : `${quizTheme.theme}`
    );
  }

  useEffect(() => {
    switch (quizTheme.theme) {
      case THEMES.BORDERS:
        if (region.value === CONTINENTS.OCEANIA) {
          settingsDispatch({
            type: "region not available for this theme",
            payload: { value: CONTINENTS.WORLD },
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

      <h3>{t(`${T_ROOT}.title`)}</h3>

      <div className="settings">
        <div className={`setting ${difficulty.setting.title}`}>
          <h4>{t(`${T_ROOT}.${difficulty.setting.title}.title`)}</h4>

          <div className="buttons">
            {difficulty.setting.values.map((item, index) => {
              return (
                <button
                  key={index}
                  className={difficulty.value === item.value ? "active" : "inactive"}
                  onClick={() =>
                    settingsDispatch({
                      type: difficulty.callDispatch,
                      payload: { value: item.value },
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
          <h4>{t(`${T_ROOT}.${quizLength.setting.title}.title`)}</h4>

          <div className="buttons">
            {quizLength.setting.values.map((item, index) => {
              return (
                <button
                  key={index}
                  className={quizLength.value === item.value ? "active" : "inactive"}
                  onClick={() =>
                    settingsDispatch({
                      type: quizLength.callDispatch,
                      payload: { value: item.value },
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
          <h4>{t(`${T_ROOT}.${region.setting.title}.title`)}</h4>

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
                      payload: { value: item.value },
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

      <button className="start" onClick={() => goToQuiz()}>
        {t(`${T_ROOT}.start`)}
      </button>
    </>
  );
}
