import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { useTreeViewport } from 'hooks/useTreeViewport/useTreeViewport';
import { ReactFlowProvider } from 'reactflow';
import { afterEach, describe, expect, it } from 'vitest';

afterEach(() => {
  cleanup();
});
const TestComponent = () => {
  const { x, y, zoom } = useTreeViewport();
  return (
    <>
      <p>{`x: ${x}`}</p>
      <p>{`y: ${y}`}</p>
      <p>{`zoom: ${zoom}`}</p>
    </>
  );
};

describe('useTreeViewport', () => {
  it('returns the current x, y, and zoom', () => {
    render(
      <ReactFlowProvider>
        <TestComponent />
      </ReactFlowProvider>
    );
    expect(screen.getByText(/x: \d+/i)).toBeInTheDocument();
    expect(screen.getByText(/y: \d+/i)).toBeInTheDocument();
    expect(screen.getByText(/zoom: \d+/i)).toBeInTheDocument();
  });
});
