import { Link } from "react-router-dom";

type GameModaleProps = {
  modaleState: any;
  setIsModaleOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

export function GameModale({ modaleState, setIsModaleOpened }: GameModaleProps) {
  const { confirmation, description } = modaleState;

  return (
    <>
      <p>{description}</p>

      <div className="buttons">
        <Link to={typeof confirmation === "string" ? confirmation : ""}>
          <button onClick={() => typeof confirmation === "function" && confirmation()}>Oui</button>
        </Link>

        <button onClick={() => setIsModaleOpened(false)}>Non</button>
      </div>
    </>
  );
}
