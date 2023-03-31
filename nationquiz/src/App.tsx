import { Route, Routes } from "react-router-dom";
import "./App.css";

// Components
import { Header } from "./components/Header";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Header />} />
        <Header />
      </Routes>
    </>
  );
}

export default App;
