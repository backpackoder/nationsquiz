import { useContext } from "react";
import { AppContext } from "./AppContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

// Components
import { Loading } from "./components/Loading";

import { Header } from "./components/Header";
import { Home } from "./components/home/Home";
import { Footer } from "./components/Footer";

import { Study } from "./components/learn/Study";
import { Infos } from "./components/learn/Infos";

import { Quiz } from "./components/quiz/Quiz";
import { QuizList } from "./components/home/QuizSelection";

import { PageNotFound } from "./components/errors/PageNotFound";
import { Error } from "./components/errors/Error";

// Types
import { AppProviderProps } from "./types/context";

// Commons
import { ROUTES } from "./commons/commons";
import { Rankings } from "./components/rankings/Rankings";

export function AppConsumer() {
  const { status }: AppProviderProps = useContext(AppContext);
  const { HOME, STUDY, INFOS, QUIZ_LIST, GAME, RANKINGS, PAGE_NOT_FOUND } = ROUTES;

  return (
    <Router>
      {/* <ErrorBoundary fallback={<Error />}> */}
      <Header />

      <main>
        {status === "loading" ? (
          <Loading />
        ) : status === "success" ? (
          <Routes>
            <Route path={HOME} element={<Home />} />

            <Route path={STUDY} element={<Study />} />
            <Route path={INFOS} element={<Infos />} />

            <Route path={QUIZ_LIST} element={<QuizList />} />
            <Route path={GAME} element={<Quiz />} />

            <Route path={RANKINGS} element={<Rankings />} />

            <Route path={PAGE_NOT_FOUND} element={<PageNotFound />} />
          </Routes>
        ) : (
          <Error />
        )}
      </main>

      <Footer />
      {/* </ErrorBoundary> */}
    </Router>
  );
}
