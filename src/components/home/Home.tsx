import { useContext } from "react";
import { AppContext } from "../../AppContext";
import { useTranslation } from "react-i18next";

// Components
import { Loading } from "../Loading";
import { QuizList } from "./QuizSelection";

// Types
import { AppProviderProps } from "../../types/context";

// Commons
import { TITLE } from "../../commons/commons";

export function Home() {
  const { isLoading }: AppProviderProps = useContext(AppContext);
  const { t } = useTranslation();

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <h1>{TITLE}</h1>
      <p>{t("home.catchPhrase")}</p>

      <QuizList />
    </>
  );
}
