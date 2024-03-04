import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { useTreeViewport } from 'hooks/useTreeViewport/useTreeViewport';
import { ReactFlowProvider } from 'reactflow';
import { afterEach, describe, expect, it } from 'vitest';

afterEach(() => {
  cleanup();
});
const TestComponent = ({
  xInput,
  yInput,
  zoomInput,
}: {
  xInput?: number;
  yInput?: number;
  zoomInput?: number;
}) => {
  const { x, y, zoom, setCenter } = useTreeViewport();
  const cleanedX = xInput ?? 1;
  const cleanedY = yInput ?? 1;
  const cleanedZoom = zoomInput ?? 1;
  return (
    <>
      <p>{`x: ${x}`}</p>
      <p>{`y: ${y}`}</p>
      <p>{`zoom: ${zoom}`}</p>
      <button onClick={() => setCenter(cleanedX, cleanedY, { zoom: cleanedZoom })}>
        Set Center
      </button>
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
