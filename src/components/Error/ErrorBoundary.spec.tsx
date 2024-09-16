import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { ErrorBoundary } from '@/components/Error/ErrorBoundary';
import { afterEach, describe, expect, test, vi } from 'vitest';

afterEach(() => cleanup());

const ErrorComponent = ({ error = false }: { error?: boolean }) => {
  if (error) throw new Error('error');

  return <div>no error</div>;
};

describe('ErrorBoundary', () => {
  test('renders children without error', () => {
    render(
      <ErrorBoundary fallback={<div>error</div>}>
        <ErrorComponent />
      </ErrorBoundary>
    );
    expect(screen.getByText(/no error/i)).toBeInTheDocument();
  });
  test('renders fallback on error', () => {
    vi.spyOn(console, 'error').mockImplementation(() => null);
    render(
      <ErrorBoundary fallback={<div>error</div>}>
        <ErrorComponent error />
      </ErrorBoundary>
    );
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });
});
