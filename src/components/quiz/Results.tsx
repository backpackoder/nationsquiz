import { useMemo } from "react";
import { useTranslation } from "react-i18next";

// Components
import { Ranking } from "./Ranking";

// Types
import { ResultsProps } from "../../types/props";

export function Results({ score, time }: ResultsProps) {
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

      <Ranking score={score} time={time} />
    </div>
  );
}
