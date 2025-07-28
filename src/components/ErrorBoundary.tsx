import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ error, errorInfo });
  }

  private handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  override render(): React.ReactNode {
    const { hasError, error, errorInfo } = this.state;

    if (hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center p-4">
          <div className="card max-w-2xl w-full">
            <div className="text-center">
              <div className="text-6xl mb-4">💥</div>

              <h1 className="text-2xl font-bold text-pokemon-error mb-4">
                Oops! Something went wrong
              </h1>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left">
                <h3 className="font-semibold text-red-800 mb-2">
                  Error Details:
                </h3>
                <p className="text-red-700 text-sm mb-2">
                  <strong>Message:</strong> {error?.message ?? 'Unknown error'}
                </p>

                {error?.stack && (
                  <details className="text-xs text-red-600 mt-2">
                    <summary className="cursor-pointer font-medium">
                      Stack Trace
                    </summary>
                    <pre className="mt-2 p-2 bg-red-100 rounded text-xs overflow-x-auto">
                      {error.stack}
                    </pre>
                  </details>
                )}
              </div>

              {errorInfo?.componentStack && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 text-left">
                  <details className="text-xs text-gray-600">
                    <summary className="cursor-pointer font-medium">
                      Component Stack
                    </summary>
                    <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-x-auto">
                      {errorInfo.componentStack}
                    </pre>
                  </details>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={this.handleReset}
                  className="btn-primary"
                  type="button"
                >
                  🔄 Try Again
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="btn-secondary"
                  type="button"
                >
                  🔃 Reload Page
                </button>
              </div>

              <div className="mt-6 text-sm text-gray-600">
                <p>If this error persists, please try:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-left">
                  <li>Refreshing the page</li>
                  <li>Clearing your browser cache</li>
                  <li>Checking your internet connection</li>
                  <li>Trying again later</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
