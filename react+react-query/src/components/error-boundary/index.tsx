import { ErrorBoundary, useErrorBoundary } from "react-error-boundary";
import type { FallbackProps } from "react-error-boundary";

type Props = {
    children: React.ReactNode
}

function FallbackRender({ error }: FallbackProps) {
    const { resetBoundary } = useErrorBoundary();

    return (
        <div role="alert" className={"error-boundary-wrapper"}>
            <div className="card">
                <div className="card__title">Something went wrong</div>
                <div className="card__message">{error.message}</div>
                <div className="card__buttons">
                    <button onClick={resetBoundary}>Try again</button>
                    <a href="mailto:help@games.com">Report this error</a>
                </div>
            </div>
        </div>
    );
}

export function ErrorBoundaryProvider({ children }: Props) {

    return (
        <ErrorBoundary FallbackComponent={FallbackRender}>
            {children}
        </ErrorBoundary>
    )
}