import { Route, Routes } from "react-router-dom";
import "./App.css";

// Components
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/footer" element={<Footer />} />

        <Route path="*" element={<h1>404 - Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
