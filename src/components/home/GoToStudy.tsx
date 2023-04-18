import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../commons/commons";

export function GoToStudy() {
  const navigate = useNavigate();

  return (
    <article className="goToStudy">
      <h2>Study the world!</h2>

      <p>
        Before starting some quizzes, you may learn the countries of the world, their capitals,
        flags, and much more...
      </p>

      <button onClick={() => navigate(ROUTES.STUDY)}>Let's study!</button>
    </article>
  );
}
