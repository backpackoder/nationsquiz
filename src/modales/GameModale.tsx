import { useNavigate } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";

type GameModaleProps = {
  setIsModaleOpened: React.Dispatch<React.SetStateAction<boolean>>;
  gameModale: any;
  gameDispatch: any;
};

export function GameModale({ setIsModaleOpened, gameModale, gameDispatch }: GameModaleProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { confirmation, description } = gameModale;

  return (
    <>
      <p className="description">
        {<Trans components={{ br: <br /> }}>{`modale.game.description.${description}`}</Trans>}
      </p>

      <div className="buttons">
        <button
          onClick={() =>
            confirmation === "restart" ? gameDispatch({ type: confirmation }) : navigate("/quiz")
          }
        >
          {t("modale.game.accept")}
        </button>

        <button onClick={() => setIsModaleOpened(false)}>{t("modale.game.decline")}</button>
      </div>
    </>
  );
}
