import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

// Components
import { Header } from "./components/Header";

import { Home } from "./components/home/Home";

import { Learn } from "./components/learn/Learn";

import { Quiz } from "./components/quiz/Quiz";
import { QuizSelection } from "./components/home/QuizSelection";

import { Footer } from "./components/Footer";

import { PageNotFound } from "./components/PageNotFound";

export function AppConsumer() {
  return (
    <Router>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Header />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/learn" element={<Learn />} />

            <Route path="/quiz" element={<QuizSelection />} />
            <Route path="/quiz/:theme" element={<Quiz />} />

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>

        <Footer />
      </ErrorBoundary>
    </Router>
  );
}
