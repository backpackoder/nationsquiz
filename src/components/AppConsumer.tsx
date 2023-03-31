import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Components
import { Header } from "./Header";

import { Home } from "./home/Home";

import { Footer } from "./Footer";

import { PageNotFound } from "./PageNotFound";

export function AppConsumer() {
  return (
    <Router>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}
