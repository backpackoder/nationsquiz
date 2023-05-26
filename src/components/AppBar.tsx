import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Components
import { ChangeLanguage } from "./ChangeLanguage";

// Commons
import { ROUTES } from "../commons/commons";

export function AppBar({ navbar }: { navbar: string }) {
  const { t } = useTranslation();
  const { HOME, STUDY, QUIZ } = ROUTES;

  return (
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
          <ChangeLanguage navbar={navbar} />
        </li>
      </ul>
    </nav>
  );
}
