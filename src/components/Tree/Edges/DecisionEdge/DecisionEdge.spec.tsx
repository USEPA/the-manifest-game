import '@testing-library/jest-dom';
import { cleanup, render } from '@testing-library/react';
import { Position, ReactFlowProvider } from 'reactflow';
import { afterEach, describe, test } from 'vitest';
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

// ToDo: We need to find a better way to test this component.
// The challenge is our component is only a slim wrapper for the BaseEdge component from reactflow.
// There's not much to test here, or even grab as a reference to test the component.
describe('Decision Edge', () => {
  test('renders', () => {
    render(<TestComponent />);
  });
});
