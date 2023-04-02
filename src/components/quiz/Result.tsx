import { Link } from "react-router-dom";

export function Result({ score }: { score: number }) {
  return (
    <div>
      <p>
        Votre score est de {score} point{score !== 1 && "s"} !
      </p>

      <button onClick={() => window.location.reload()}>Rejouer</button>

      <Link to={"/quiz"}>
        <button>Liste des quiz</button>
      </Link>
    </div>
  );
}
