import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../AppContext";
import { useTranslation } from "react-i18next";

// Hooks
import { AppProviderProps } from "../types/context";

type SettingsModaleProps = {
  quizTheme: any;
  setIsModaleOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

export function SettingsModale({ quizTheme, setIsModaleOpened }: SettingsModaleProps) {
  const { settingsDispatch, allSettings }: AppProviderProps = useContext(AppContext);
  const { t } = useTranslation();

  const ROOT = "modale.settings";

  return (
    <>
      <h2>{t(`quizList.${quizTheme.theme}.title`)}</h2>

      <h3>{t(`${ROOT}.title`)}</h3>

      <div className="settings">
        {allSettings.map((setting, index) => {
          return (
            <div key={index} className="setting">
              <h4>{t(`${ROOT}.${setting.setting.title}.title`)}</h4>

              <div className="buttons">
                {setting.setting.values.map((item, idx) => {
                  return (
                    <button
                      key={idx}
                      className={setting.value === item.value ? "active" : "inactive"}
                      onClick={() =>
                        settingsDispatch({
                          type: allSettings[index].callDispatch,
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
          );
        })}
      </div>

      <Link to={`/quiz/${quizTheme.theme}`} onClick={() => setIsModaleOpened(false)}>
        {t(`${ROOT}.start`)}
      </Link>
    </>
  );
}
