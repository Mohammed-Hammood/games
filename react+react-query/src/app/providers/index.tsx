import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundaryProvider } from "components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FiltersProvider } from "./filters-provider";


export default function Providers(App: () => React.ReactNode) {
    const queryClient = new QueryClient();

    return (
        <ErrorBoundaryProvider>
            <StrictMode>
                <BrowserRouter>
                    <FiltersProvider>
                        <QueryClientProvider client={queryClient}>
                            <App />
                        </QueryClientProvider >
                    </FiltersProvider>
                </BrowserRouter>
            </StrictMode>
        </ErrorBoundaryProvider>
    )
}