import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Commons
import { ROUTES } from "../../commons/commons";

type ButtonsProps = {
  dispatch: any;
  isQuizfinished: boolean;
};

export function Buttons({ isQuizfinished, dispatch }: ButtonsProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="buttons">
      <button
        className="restart"
        onClick={() =>
          dispatch({ type: isQuizfinished ? "restart" : "open modale", payload: "restart" })
        }
      >
        {isQuizfinished ? t("game.result.restart") : t("game.restart")}
      </button>

      <button
        className="leave"
        onClick={() =>
          isQuizfinished
            ? navigate(ROUTES.QUIZ_LIST)
            : dispatch({ type: "open modale", payload: "leave" })
        }
      >
        {isQuizfinished ? t("game.result.another") : t("game.leave")}
      </button>
    </div>
  );
}
