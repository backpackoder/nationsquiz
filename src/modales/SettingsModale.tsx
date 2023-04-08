import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Hooks
import { useSettings } from "../hooks/settings";

type SettingsModaleProps = {
  quizTheme: any;
  setIsModaleOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

export function SettingsModale({ quizTheme, setIsModaleOpened }: SettingsModaleProps) {
  const { t } = useTranslation();
  const { settings } = useSettings();

  const ROOT = "modale.settings";

  return (
    <>
      <h2>{t(`quizList.${quizTheme.theme}.title`)}</h2>

      <h3>{t(`${ROOT}.title`)}</h3>

      <div className="settings">
        {settings.map((setting, index) => {
          return (
            <div key={index} className="setting">
              <h4>{t(`${ROOT}.${setting.setting.title}.title`)}</h4>

              <div className="buttons">
                {setting.setting.values.map((item, index) => {
                  return (
                    <button
                      key={index}
                      className={setting.value === item.value ? "active" : "inactive"}
                      onClick={() => setting.changeValue(item.value)}
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
