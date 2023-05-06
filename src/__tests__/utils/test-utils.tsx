import { render as renderReactTL } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "../../AppProvider";

const queryClient = new QueryClient();

function render(ui: any, options?: any): any {
  const Wrapper = ({ children }: any) => (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </AppProvider>
    </QueryClientProvider>
  );

  return renderReactTL(ui, { wrapper: Wrapper, ...options });
}

export * from "@testing-library/react";
export { render };
