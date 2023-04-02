import { useContext, useState } from "react";
import { AppContext } from "../../AppContext";

// Types
import { AppProviderProps } from "../../types/main";

// Components
import { QuizRunning } from "./QuizRunning";

export function Quiz() {
  const { data }: AppProviderProps = useContext(AppContext);

  return (
    data && (
      <section className="quiz">
        <QuizRunning />
      </section>
    )
  );
}
