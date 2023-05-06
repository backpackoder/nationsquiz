import { useTranslation } from "react-i18next";

// Components
import { DidYouKnow } from "./DidYouKnow";
import { GoToStudy } from "./GoToStudy";
import { QuizList } from "./QuizList";

// Commons
import { TITLE } from "../../commons/commons";

export function Home() {
  const { t } = useTranslation();

  return (
    <section>
      {/* <h1>{TITLE}</h1> */}
      {/* <p>{t("home.catchPhrase")}</p> */}

      <DidYouKnow />

      <GoToStudy />

      <QuizList />
    </section>
  );
}
