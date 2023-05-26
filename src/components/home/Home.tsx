// Components
import { DidYouKnow } from "./DidYouKnow";
import { GoToStudy } from "./GoToStudy";
import { QuizList } from "./QuizList";

export function Home() {
  return (
    <section>
      <DidYouKnow />

      <GoToStudy />

      <QuizList />
    </section>
  );
}
