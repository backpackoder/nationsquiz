import { useContext } from "react";
import { AppContext } from "../../AppContext";

// Components
import { Loading } from "../Loading";
import { QuizSelection } from "./QuizSelection";

// Types
import { AppProviderProps } from "../../types/main";

export function Home() {
  const { isLoading, data }: AppProviderProps = useContext(AppContext);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <h1>Nations Quiz</h1>
      <p>Le quiz qui vous permet de tester vos connaissances sur les nations du monde.</p>
      <p>data: {data[7].name.common}</p>

      <QuizSelection />
    </>
  );
}
