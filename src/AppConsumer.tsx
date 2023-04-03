import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

// Components
import { Header } from "./components/Header";

import { Home } from "./components/home/Home";

import { Learn } from "./components/learn/Learn";

import { Quiz } from "./components/quiz/Quiz";
import { QuizList } from "./components/home/QuizList";

import { Footer } from "./components/Footer";

import { PageNotFound } from "./components/PageNotFound";
import { ROUTES } from "./commons/commons";

export function AppConsumer() {
  const { HOME, LEARN, QUIZ_LIST, GAME, PAGE_NOT_FOUND } = ROUTES;

  return (
    <Router>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Header />

        <main>
          <Routes>
            <Route path={HOME} element={<Home />} />

            <Route path={LEARN} element={<Learn />} />

            <Route path={QUIZ_LIST} element={<QuizList />} />
            <Route path={GAME} element={<Quiz />} />

            <Route path={PAGE_NOT_FOUND} element={<PageNotFound />} />
          </Routes>
        </main>

        <Footer />
      </ErrorBoundary>
    </Router>
  );
}
