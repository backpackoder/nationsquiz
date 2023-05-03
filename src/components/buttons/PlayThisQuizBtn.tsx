import { useContext } from "react";
import { AppContext } from "../../AppContext";
import { useLocation, useNavigate } from "react-router-dom";
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
  dispatch?: React.Dispatch<any>;
};

export function PlayThisQuizBtn({ settings, dispatch }: PlayThisQuizBtnProps) {
  const { pathname } = useLocation();
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

    switch (pathname) {
      case ROUTES.HOME:
        navigate(`${ROUTES.QUIZ.ROOT}${theme}`);
        break;

      case `/${ROUTES.QUIZ.ROOT}${theme}`:
        dispatch && dispatch({ type: "restart", payload: "restart" });
        break;

      default:
        window.location.reload();
        break;
    }
  }

  return (
    <button onClick={() => goToQuiz()} className="playThisQuizBtn">
      {t("rankings.playThisQuiz")}
    </button>
  );
}
