import "./App.css";
import { AppProvider } from "./AppProvider";

// Components
import { AppConsumer } from "./components/AppConsumer";

function App() {
  return (
    <AppProvider>
      <AppConsumer />
    </AppProvider>
  );
}

export default App;
