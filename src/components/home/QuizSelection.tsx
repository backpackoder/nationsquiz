import { Link } from "react-router-dom";

const quizData = [
  {
    theme: "flags",
    title: "Drapeaux",
    description: "Quiz sur les drapeaux des pays",
  },
  {
    theme: "capitals",
    title: "Capitales",
    description: "Quiz sur les capitales des pays",
  },
  {
    theme: "demography",
    title: "Demographie",
    description: "Quel pays à le plus d'habitants ?",
  },
];

export function QuizSelection() {
  return (
    <section className="quiz-selection">
      <h2>Choisissez votre quiz</h2>

      <article className="quiz-selection__list">
        {quizData.map((item, index) => {
          const { description, theme, title } = item;

          return (
            <Link key={index} to={`/quiz/${theme}`}>
              <div className="quiz-selection__item" data-title={description}>
                <h3>{title}</h3>

                {/* <p>Quiz sur les drapeaux des pays</p> */}

                <div className="imgWrapper">
                  <img src={`../src/assets/imgs/${theme}.jpg`} alt={theme} />
                </div>

                <button>Je commence le quiz</button>
              </div>
            </Link>
          );
        })}
      </article>
    </section>
  );
}
