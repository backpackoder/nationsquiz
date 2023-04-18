import { useState } from "react";
import { useTranslation } from "react-i18next";

// Hooks
import { useGetRandomInfo } from "../../hooks/randomInfo";

export function DidYouKnow() {
  const { t } = useTranslation();

  const [nextInfo, setNextInfo] = useState(0);
  const [animating, setAnimating] = useState(0);

  const info = useGetRandomInfo(nextInfo);
  const { randomInfo, randomCountryFromInfo, sentenceInfo } = info;

  function handleClick() {
    setNextInfo(nextInfo + 1);
    setAnimating(animating + 1);
  }

  return randomCountryFromInfo ? (
    <>
      <section className="didYouKnow">
        <h2>{t("didYouKnow.title")}</h2>
        <div key={animating} className="info">
          <p>{t(`didYouKnow.sentence.${randomInfo?.type}`, { ...sentenceInfo })}</p>
          <div className="imgWrapper">
            <img
              src={randomCountryFromInfo.flags.png}
              alt={randomCountryFromInfo.flags.alt ?? "Country flag of the random fact"}
            />
          </div>
        </div>
        <button onClick={() => handleClick()}>{t("didYouKnow.nextInfo")}</button>
      </section>
    </>
  ) : null;
}
