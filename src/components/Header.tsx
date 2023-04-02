import { useState } from "react";
import { Link } from "react-router-dom";
import { i18n } from "../i18n";
import { useTranslation } from "react-i18next";
import { LanguageBtn } from "../types/main";

export function Header() {
  const { t } = useTranslation();

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">{t("menu.home")}</Link>
          </li>
          <li>
            <Link to="/learn">{t("menu.learn")}</Link>
          </li>
          <li>
            <Link to="/quiz">{t("menu.quiz")}</Link>
          </li>
          <li>
            <ChangeLanguage />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export const languageBtn: LanguageBtn = [
  {
    language: "fr",
    flag: <img src="https://flagcdn.com/fr.svg" width={40} height={20} alt="Français" />,
  },
  {
    language: "en",
    flag: <img src="https://flagcdn.com/gb.svg" width={40} height={20} alt="Anglais" />,
  },
  {
    language: "es",
    flag: <img src="https://flagcdn.com/es.svg" width={40} height={20} alt="Espagnol" />,
  },
];

export function ChangeLanguage() {
  const [openLanguageList, setOpenLanguageList] = useState(false);

  function onChange(language: string) {
    i18n.changeLanguage(language);
    setOpenLanguageList(!openLanguageList);
  }

  return (
    <div className="changeLanguageWrapper">
      <button className="changeLanguageBtn" onClick={() => setOpenLanguageList(!openLanguageList)}>
        <img
          src={`https://flagcdn.com/${i18n.language === "en" ? "gb" : i18n.language}.svg`}
          width={40}
          height={20}
          alt="Français"
        />
      </button>

      <div className={`openLanguage ${openLanguageList ? "active" : "inactive"}`}>
        {languageBtn.map((btn) => {
          return (
            <button key={btn.language} onClick={() => onChange(btn.language)}>
              {btn.flag}
            </button>
          );
        })}
      </div>
    </div>
  );
}
