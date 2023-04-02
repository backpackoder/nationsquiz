import { useContext } from "react";
import { AppContext } from "../../AppContext";

// Components
import { Loading } from "../Loading";
import { QuizSelection } from "./QuizSelection";

// Types
import { AppProviderProps } from "../../types/main";

// Commons
import { TITLE } from "../../commons/commons";

export function Home() {
  const { isLoading }: AppProviderProps = useContext(AppContext);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <h1>{TITLE}</h1>
      <p>Le quiz qui vous permet de tester vos connaissances sur les nations du monde.</p>

      <QuizSelection />
    </>
  );
}
