import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { ReactFlowProvider } from 'reactflow';
import { afterEach, describe, expect, test } from 'vitest';
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
});
