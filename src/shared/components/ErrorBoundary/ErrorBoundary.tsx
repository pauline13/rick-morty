import { Component, type ReactNode } from 'react';

import { Button } from '@/shared/components';

import './ErrorBoundary.css';

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null
  };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className='ErrorBoundary'>
          <h1 className='ErrorBoundary__title'>Woops! Something went wrong</h1>
          <Button
            className='ErrorBoundary__button'
            text='Reload page'
            onClick={() => window.location.reload()}
          />
        </section>
      );
    }

    return this.props.children;
  }
}
