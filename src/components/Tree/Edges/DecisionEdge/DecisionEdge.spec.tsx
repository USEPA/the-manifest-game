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

// ToDo: We need to find a better way to test this component.
// The challenge is our component is only a slim wrapper for the BaseEdge component from reactflow.
// There's not much to test here, or even grab as a reference to test the component.
describe('Decision Edge', () => {
  test('renders', () => {
    render(<TestComponent />);
  });
  test('stroke color is altered when decision made', () => {
    render(
      <ReactFlowProvider>
        <svg data-testid={'1'}>
          <DecisionEdge
            data={{ decisionMade: true }}
            id={'1'}
            source={'foo'}
            target={'bar'}
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
    const edge = screen.getByTestId('1').querySelector('path');
    expect(edge).toHaveClass(/stroke/i);
  });
  test('no style when decision not made', () => {
    render(
      <ReactFlowProvider>
        <svg data-testid={'1'}>
          <DecisionEdge
            data={{ decisionMade: false }}
            id={'1'}
            source={'foo'}
            target={'bar'}
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
    const edge = screen.getByTestId('1').querySelector('path');
    expect(edge).not.toHaveStyle('stroke: #00754e');
  });
});
