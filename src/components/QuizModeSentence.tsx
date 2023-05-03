import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

type QuizModeSentenceProps = {
  theme?: string;
  settings: {
    region: string;
    difficulty: string;
    length: string;
  };
};

export function QuizModeSentence({ theme, settings }: QuizModeSentenceProps) {
  const { theme: themeParams } = useParams();
  const { t } = useTranslation();
  const { region, difficulty, length } = settings;

  return (
    <p className="quizModeSentence">
      {t("rankings.sentence.main", {
        theme: t(`settings.themes.${theme ?? themeParams}`).toUpperCase(),
        region: t(`settings.regions.${region.toLowerCase()}`).toUpperCase(),
      })}
      <br />
      {t("rankings.sentence.second", {
        difficulty: t(`settings.difficulties.${difficulty}`).toLowerCase(),
        length: t(`settings.lengths.${length}`).toLowerCase(),
      })}
    </p>
  );
}
