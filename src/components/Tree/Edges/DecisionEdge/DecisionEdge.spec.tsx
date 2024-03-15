import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { Position, ReactFlowProvider } from 'reactflow';
import { afterEach, describe, expect, test } from 'vitest';
import { DecisionEdge } from './DecisionEdge';

afterEach(() => cleanup());

interface TestComponentProps {
  source?: string;
  target?: string;
}

const TestComponent = (props: TestComponentProps) => (
  <ReactFlowProvider>
    <svg>
      <DecisionEdge
        id={'1'}
        source={props.source || 'foo'}
        target={props.target || 'bar'}
        sourceX={0}
        sourceY={0}
        targetX={0}
        targetY={0}
        sourcePosition={Position.Left}
        targetPosition={Position.Right}
      />
    </svg>
  </ReactFlowProvider>
);

describe('Decision Edge', () => {
  test('renders', () => {
    render(<TestComponent />);
    expect(screen.queryByTestId('tree-edge-foo-bar')).toBeInTheDocument();
  });
});
