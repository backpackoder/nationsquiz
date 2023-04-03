import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

type GameModaleProps = {
  setIsModaleOpened: React.Dispatch<React.SetStateAction<boolean>>;
  gameModale: any;
  dispatch: any;
};

export function GameModale({ setIsModaleOpened, gameModale, dispatch }: GameModaleProps) {
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
