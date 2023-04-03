import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

type ResultProps = {
  dispatch: any;
  score: number;
};

export function Result({ dispatch, score }: ResultProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const description = useMemo(() => {
    const root = "game.result.description";

    switch (score) {
      case 0:
        return t(`${root}.zeroPoints`);

      case 1:
        return t(`${root}.onePoint`);

      default:
        return t(`${root}.manyPoints`, { score });
    }
  }, [score, t]);

  return (
    <div>
      <p>{description}</p>
      {/* 
      <button onClick={() => dispatch({ type: "restart" })}>{t("game.result.restart")}</button>

      <button onClick={() => navigate("/quiz")}>{t("game.result.another")}</button> */}
    </div>
  );
}
