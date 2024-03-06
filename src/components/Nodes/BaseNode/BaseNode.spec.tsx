import '@testing-library/jest-dom';
import { act, cleanup, render, screen } from '@testing-library/react';
import { BaseNode } from 'components/Nodes/BaseNode/BaseNode';
import { ReactFlowProvider } from 'reactflow';
import useStore from 'store';
import { afterEach, describe, expect, it } from 'vitest';

const TestComponent = () => {
  return (
    <ReactFlowProvider>
      <BaseNode
        id={'1'}
        dragging={false}
        selected={false}
        type={''}
        zIndex={0}
        isConnectable={false}
        xPos={0}
        yPos={0}
      >
        <div>Test</div>
      </BaseNode>
    </ReactFlowProvider>
  );
};

describe('BaseNode', () => {
  afterEach(() => cleanup());
  it('renders', () => {
    render(<TestComponent />);
    expect(screen.getByTestId('node-1')).toBeInTheDocument();
  });
  it('handles changes in tree layout', () => {
    useStore.setState({ direction: 'LR' });
    const { rerender } = render(<TestComponent />);
    expect(screen.getByTestId('left-handle')).toBeInTheDocument();
    expect(screen.getByTestId('right-handle')).toBeInTheDocument();
    act(() => {
      useStore.setState({ direction: 'TB' });
    });
    rerender(<TestComponent />);
    expect(screen.getByTestId('top-handle')).toBeInTheDocument();
    expect(screen.getByTestId('bottom-handle')).toBeInTheDocument();
  });
});
