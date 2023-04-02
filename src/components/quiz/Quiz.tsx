import { useContext, useState } from "react";
import { AppContext } from "../../AppContext";

// Types
import { AppProviderProps } from "../../types/main";

// Components
import { SettingUp } from "./SettingUp";
import { QuizRunning } from "./QuizRunning";

export function Quiz() {
  const { data }: AppProviderProps = useContext(AppContext);

  const [hasQuizStarted, setHasQuizStarted] = useState(false);

  return (
    data &&
    (!hasQuizStarted ? <SettingUp setHasQuizStarted={setHasQuizStarted} /> : <QuizRunning />)
  );
}
