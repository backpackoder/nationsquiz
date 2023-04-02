export function Result({ score }: { score: number }) {
  return (
    <div>
      <p>
        Votre score est de {score} point{score !== 1 && "s"} !
      </p>
      <button>Rejouer</button>
      <button>Liste des quiz</button>
    </div>
  );
}
