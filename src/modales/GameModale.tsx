import { Link, useNavigate } from "react-router-dom";

type GameModaleProps = {
  dispatch: any;
  gameModale: any;
  setIsModaleOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

export function GameModale({ dispatch, gameModale, setIsModaleOpened }: GameModaleProps) {
  const navigate = useNavigate();
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
          Oui
        </button>

        <button onClick={() => setIsModaleOpened(false)}>Non</button>
      </div>
    </>
  );
}
