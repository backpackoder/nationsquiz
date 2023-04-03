import { useNavigate } from "react-router-dom";

type ResultProps = {
  dispatch: any;
  score: number;
};

export function Result({ dispatch, score }: ResultProps) {
  const navigate = useNavigate();

  return (
    <div>
      <p>
        Votre score est de {score} point{score !== 1 && "s"} !
      </p>

      <button onClick={() => dispatch({ type: "restart" })}>Rejouer</button>

      <button onClick={() => navigate("/quiz")}>Liste des quiz</button>
    </div>
  );
}
