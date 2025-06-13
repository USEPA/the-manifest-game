import '@testing-library/jest-dom';
import { BaseNode } from '@/components/Tree/Nodes/BaseNode/BaseNode';
import { useTreeStore } from '@/store';
import { ORIENTATION } from '@/store/TreeSlice/treeSlice';
import { act, cleanup, render, screen } from '@testing-library/react';
import { ReactFlowProvider } from 'reactflow';
import { afterEach, describe, expect, test } from 'vitest';

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
  test('renders', () => {
    render(<TestComponent />);
    expect(screen.getByTestId('node-1')).toBeInTheDocument();
  });
  test('handles changes in tree layout', () => {
    useTreeStore.setState({ direction: ORIENTATION.leftToRight });
    const { rerender } = render(<TestComponent />);
    expect(screen.getByTestId('left-handle')).toBeInTheDocument();
    expect(screen.getByTestId('right-handle')).toBeInTheDocument();
    act(() => {
      useTreeStore.setState({ direction: ORIENTATION.topToBottom });
    });
    rerender(<TestComponent />);
    expect(screen.getByTestId('top-handle')).toBeInTheDocument();
    expect(screen.getByTestId('bottom-handle')).toBeInTheDocument();
  });
});
