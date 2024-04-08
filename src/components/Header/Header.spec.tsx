import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { ReactFlowProvider } from 'reactflow';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { Header } from './Header';

const TestComponent = ({ title }: { title?: string }) => {
  return (
    <ReactFlowProvider>
      <Header treeTitle={title ?? 'foo'} />
    </ReactFlowProvider>
  );
};

describe('Header', () => {
  afterEach(() => cleanup());
  test('renders a title', () => {
    const title = 'hello';
    render(<TestComponent title={title} />);
    expect(screen.getByText(title)).toBeInTheDocument();
  });
  test('no feedback link rendered if no config', () => {
    vi.stubEnv('VITE_ISSUE_URL', '');
    render(<TestComponent />);
    expect(screen.queryByRole('link', { name: /feedback/i })).not.toBeInTheDocument();
  });
  test('feedback link rendered if config present', () => {
    vi.stubEnv('VITE_ISSUE_URL', 'mailto:foo@epa.gov');
    render(<TestComponent />);
    expect(screen.queryByRole('link', { name: /feedback/i })).toBeInTheDocument();
  });
});
