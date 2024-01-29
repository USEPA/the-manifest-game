import { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorState {
  hasError: boolean;
  error?: Error;
}

interface ErrorProps {
  fallback: ReactNode;
  children: ReactNode;
}

/**
 * Error boundaries are React components that catch JavaScript errors
 * anywhere in their child component tree.
 *
 * See React's documentation:
 * https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
 */
export class ErrorBoundary extends Component<ErrorProps, ErrorState> {
  constructor(props: ErrorProps) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  static getDerivedStateFromError(error: Error): ErrorState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  // Anything we want to error boundary to do when an error is caught
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidCatch(error: Error, _info: ErrorInfo) {
    console.error(error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}
