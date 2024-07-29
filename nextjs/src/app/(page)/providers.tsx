"use client"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ErrorBoundaryProvider } from "@/components";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from "react-toastify"

export default function Providers({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient()

    return (
        <ErrorBoundaryProvider>
            <QueryClientProvider client={queryClient}>
                {children}
                <ToastContainer />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </ErrorBoundaryProvider>
    )
}