import { useMemo } from "react";
import { useTranslation } from "react-i18next";

// Types
import { ResultProps } from "../../types/props";

export function Result({ score }: ResultProps) {
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

  return <p>{description}</p>;
}
