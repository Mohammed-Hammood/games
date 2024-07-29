import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ErrorBoundaryProvider } from "components";
import store from "store";

export default function Providers(App: () => React.ReactNode) {
    return (
        <ErrorBoundaryProvider>
            <React.StrictMode>
                <BrowserRouter>
                    <Provider store={store}>
                        <App />
                    </Provider>
                </BrowserRouter>
            </React.StrictMode>
        </ErrorBoundaryProvider>
    )
}