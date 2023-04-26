import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { i18n } from "../i18n";
import { useTranslation } from "react-i18next";
import { Iso, LanguageBtn } from "../types/main";
import { AppContext } from "../AppContext";
import { ROUTES } from "../commons/commons";

export function Header() {
  const { t } = useTranslation();
  const { HOME, STUDY, QUIZ } = ROUTES;

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to={HOME}>{t("menu.home")}</Link>
          </li>
          <li>
            <Link to={STUDY}>{t("menu.study")}</Link>
          </li>
          <li>
            <Link to={QUIZ.ROOT}>{t("menu.quiz")}</Link>
          </li>
          <li>
            <ChangeLanguage />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export function ChangeLanguage() {
  const { setActualLanguage } = useContext(AppContext);
  const { t } = useTranslation();

  const [openLanguageList, setOpenLanguageList] = useState(false);

  const languageBtn: LanguageBtn = [
    {
      language: "fra",
      flag: (
        <img
          src="https://flagcdn.com/fr.svg"
          width={40}
          height={20}
          alt={t("language.fra") ?? "french"}
        />
      ),
    },
    {
      language: "en",
      flag: (
        <img
          src="https://flagcdn.com/gb.svg"
          width={40}
          height={20}
          alt={t("language.en") ?? "english"}
        />
      ),
    },
    {
      language: "spa",
      flag: (
        <img
          src="https://flagcdn.com/es.svg"
          width={40}
          height={20}
          alt={t("language.spa") ?? "spanish"}
        />
      ),
    },
  ];

  function onChange(language: Iso) {
    setActualLanguage(language);
    i18n.changeLanguage(language);
    setOpenLanguageList(!openLanguageList);
  }

  function convertLanguage(language: string) {
    switch (language) {
      case "en":
        return "gb";

      case "spa":
        return "es";

      default:
        return "fr";
    }
  }

  return (
    <div className="changeLanguageWrapper">
      <button className="changeLanguageBtn" onClick={() => setOpenLanguageList(!openLanguageList)}>
        <img
          src={`https://flagcdn.com/${convertLanguage(i18n.language)}.svg`}
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
