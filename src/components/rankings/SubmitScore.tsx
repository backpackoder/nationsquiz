import { useContext } from "react";
import { AppContext } from "../../AppContext";
import { useTranslation } from "react-i18next";

// Types
import { SubmitScoreProps } from "../../types/props";
import { AppProviderProps } from "../../types/context";

export function SubmitScore({ infosToSubmit, onChangeSubmit, submitScore }: SubmitScoreProps) {
  const { t } = useTranslation();
  const { data }: AppProviderProps = useContext(AppContext);
  const { score, time, pseudo, nationality } = infosToSubmit;

  const placeholder = t("submitScore.placeholder");

  return (
    <div className="submitScore">
      <p>
        {t(`submitScore.description.${score === 1 ? "onePoint" : "manyPoints"}`, { score, time })}
        <br />
        {t("submitScore.saveScore")}
      </p>

      <input
        type="text"
        placeholder={placeholder}
        value={pseudo}
        maxLength={20}
        onChange={(e) => onChangeSubmit({ type: "pseudo", value: e.target.value })}
      />

      <select
        name="nationality"
        id="nationality"
        value={nationality}
        onChange={(e) => onChangeSubmit({ type: "nationality", value: e.target.value })}
      >
        <option value="">{t("submitScore.selectCountry")}</option>
        {data
          ?.map((item) => {
            return item.name.common;
          })
          .sort((a, b) => a.localeCompare(b))
          .map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
      </select>

      <button onClick={() => submitScore()}>{t("submitScore.btn")}</button>
    </div>
  );
}
