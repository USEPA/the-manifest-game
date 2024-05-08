import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { DefaultNode } from 'components/Tree/Nodes/DefaultNode/DefaultNode';
import { ReactFlowProvider } from 'reactflow';
import { afterEach, describe, expect, test } from 'vitest';

interface TestComponentProps {
  help?: string;
}

const TestComponent = (props: TestComponentProps) => {
  return (
    <ReactFlowProvider>
      <DefaultNode
        id={'1'}
        data={{
          label: 'foo',
          children: [],
          help: props.help,
        }}
        selected={false}
        type={''}
        zIndex={0}
        isConnectable={false}
        xPos={0}
        yPos={0}
        dragging={false}
      />
    </ReactFlowProvider>
  );
};

afterEach(() => cleanup());

describe('DefaultNode', () => {
  test('renders a node with text', () => {
    const myLabel = 'what site type?';
    render(
      <ReactFlowProvider>
        <DefaultNode
          id={''}
          data={{
            label: myLabel,
            children: [],
          }}
          selected={false}
          type={''}
          zIndex={0}
          isConnectable={false}
          xPos={0}
          yPos={0}
          dragging={false}
        />
      </ReactFlowProvider>
    );
    expect(screen.getByText(myLabel)).toBeInTheDocument();
  });
  test('renders an id we can use during testing', () => {
    render(<TestComponent />);
    expect(screen.getByTestId('default-node-1-content')).toBeInTheDocument();
  });
  test('no HelpIcon when falsy', () => {
    render(<TestComponent />);
    expect(screen.queryByLabelText(/help/i)).not.toBeInTheDocument();
  });
  test('HelpIcon displayed help is true', () => {
    render(<TestComponent help={'root.json'} />);
    expect(screen.queryByLabelText(/more information/i)).toBeInTheDocument();
  });
});
