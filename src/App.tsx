import "./App.css";
import { AppProvider } from "./AppProvider";
import { QueryClient, QueryClientProvider } from "react-query";

// Components
import { AppConsumer } from "./AppConsumer";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <AppConsumer />
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
