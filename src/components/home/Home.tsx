import { useContext } from "react";
import { AppContext } from "../AppContext";

// Components
import { Loading } from "../Loading";
import { Quiz } from "../quiz/Quiz";

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
      <p>Vous pouvez jouer en solo ou en équipe.</p>
      <p>Vous pouvez aussi créer votre propre quiz.</p>
      <p>data: {data[7].name.common}</p>

      <Quiz />
    </>
  );
}
