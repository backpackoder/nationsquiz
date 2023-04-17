import "./App.css";
import { AppProvider } from "./AppProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

// Components
import { AppConsumer } from "./AppConsumer";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <AppConsumer />
      </AppProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
