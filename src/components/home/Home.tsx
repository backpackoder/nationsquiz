import { useTranslation } from "react-i18next";

// Components
import { QuizList } from "./QuizSelection";

// Commons
import { TITLE } from "../../commons/commons";

export function Home() {
  const { t } = useTranslation();

  return (
    <>
      <h1>{TITLE}</h1>
      <p>{t("home.catchPhrase")}</p>

      <QuizList />
    </>
  );
}
