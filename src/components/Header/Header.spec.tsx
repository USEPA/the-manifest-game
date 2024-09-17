import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactFlowProvider } from 'reactflow';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { Header } from './Header';

beforeEach(() => {
  vi.unstubAllEnvs();
});
afterEach(() => {
  cleanup();
});
afterEach(() => {
  vi.unstubAllEnvs();
});

const TestComponent = ({ title }: { title?: string }) => {
  return (
    <ReactFlowProvider>
      <Header treeTitle={title ?? 'foo'} />
    </ReactFlowProvider>
  );
};

describe('Header', () => {
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

  test('renders a menu button', () => {
    render(<TestComponent />);
    expect(screen.getByRole('button', { name: /menu/i })).toBeInTheDocument();
  });

  test('feedback link rendered if config present', async () => {
    vi.stubEnv('VITE_ISSUE_URL', 'mailto:foo@epa.gov');
    const user = userEvent.setup();
    render(<TestComponent />);
    await user.click(screen.getByRole('button', { name: /menu/i }));
    expect(screen.queryByRole('link', { name: /feedback/i })).toBeInTheDocument();
  });

  test('renders a how to help button', async () => {
    const user = userEvent.setup();
    render(<TestComponent />);
    await user.click(screen.getByRole('button', { name: /menu/i }));
    expect(screen.queryByText(/how to/i)).toBeInTheDocument();
  });
});
