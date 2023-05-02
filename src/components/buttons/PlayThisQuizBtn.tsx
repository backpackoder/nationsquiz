import { useContext } from "react";
import { AppContext } from "../../AppContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Types
import { AppProviderProps } from "../../types/context";
import { ROUTES } from "../../commons/commons";

type PlayThisQuizBtnProps = {
  settings: {
    theme: string;
    region: string;
    difficulty: string;
    length: string;
  };
};

export function PlayThisQuizBtn({ settings }: PlayThisQuizBtnProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { settingsDispatch }: AppProviderProps = useContext(AppContext);
  const { theme, region, difficulty, length } = settings;

  function goToQuiz() {
    settingsDispatch({
      type: `goToQuiz`,
      payload: {
        value: "",
        region,
        difficulty,
        length,
      },
    });

    // rankingsDispatch({ type: "reset score and time" });

    navigate(`../../${ROUTES.QUIZ.ROOT}${theme}`);

    window.location.reload();
  }

  return (
    <button onClick={() => goToQuiz()} className="playThisQuizBtn">
      {t("rankings.playThisQuiz")}
    </button>
  );
}
