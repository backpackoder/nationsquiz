import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Types
import { ButtonsProps } from "../../types/props";

// Commons
import { ROUTES } from "../../commons/commons";

export function Buttons({ isQuizfinished, dispatch, setIsScoreSubmitted }: ButtonsProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  function restart() {
    setIsScoreSubmitted(false);

    dispatch({ type: isQuizfinished ? "restart" : "open modale", payload: "restart" });
  }

  function leave() {
    setIsScoreSubmitted(false);

    isQuizfinished
      ? navigate(ROUTES.QUIZ.ROOT)
      : dispatch({ type: "open modale", payload: "leave" });
  }

  return (
    <div className="buttons">
      <button className="restart" onClick={() => restart()}>
        {isQuizfinished ? t("game.result.restart") : t("game.restart")}
      </button>

      <button className="leave" onClick={() => leave()}>
        {isQuizfinished ? t("game.result.another") : t("game.leave")}
      </button>
    </div>
  );
}
