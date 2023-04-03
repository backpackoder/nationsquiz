import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

type GameModaleProps = {
  dispatch: any;
  gameModale: any;
  setIsModaleOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

export function GameModale({ dispatch, gameModale, setIsModaleOpened }: GameModaleProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { confirmation, description } = gameModale;

  return (
    <>
      <p>{description}</p>

      <div className="buttons">
        <button
          onClick={() =>
            confirmation === "restart" ? dispatch({ type: confirmation }) : navigate("/quiz")
          }
        >
          {t("modale.game.accept")}
        </button>

        <button onClick={() => setIsModaleOpened(false)}>{t("modale.game.decline")}</button>
      </div>
    </>
  );
}
