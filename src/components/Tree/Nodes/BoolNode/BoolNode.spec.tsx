import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BoolNode, BoolNodeData } from 'components/Tree/Nodes/BoolNode/BoolNode';
import { NodeProps, ReactFlowProvider } from 'reactflow';
import useTreeStore from 'store';
import { afterEach, describe, expect, test } from 'vitest';

afterEach(() => cleanup());

interface TestComponentProps {
  overwrites?: Partial<NodeProps<BoolNodeData>>;
  primaryId?: string;
  yesId?: string;
  noId?: string;
}

const TestComponent = ({ overwrites, primaryId, noId, yesId }: TestComponentProps) => {
  const id = primaryId || '1';
  const yId = yesId || '2';
  const nId = noId || '3';
  useTreeStore.setState({
    tree: {
      [id]: {
        id: id,
        hidden: false,
        data: { label: 'question', children: [yId, nId] },
        position: { x: 0, y: 0, rank: 0 },
      },
      [yId]: {
        id: yId,
        hidden: true,
        data: { children: [], label: 'foo' },
        position: { x: 0, y: 0, rank: 0 },
      },
      [nId]: {
        id: nId,
        hidden: true,
        data: { children: [], label: 'bar' },
        position: { x: 0, y: 0, rank: 0 },
      },
    },
  });

  const props: NodeProps<BoolNodeData> = {
    id: id,
    data: {
      label: 'this is a question?',
      yesId: yId,
      noId: nId,
      children: [],
      ...overwrites?.data,
    },
    selected: false,
    type: '',
    zIndex: 0,
    isConnectable: false,
    xPos: 0,
    yPos: 0,
    dragging: false,
    ...overwrites,
  };
  return (
    <ReactFlowProvider>
      <BoolNode {...props} />
    </ReactFlowProvider>
  );
};

describe('BoolNode', () => {
  test('renders a node', () => {
    const label = 'what site type?';
    // @ts-expect-error - don't need to pass all props
    render(<TestComponent overwrites={{ data: { label } }} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });
  test('renders a yes and no button', () => {
    render(<TestComponent />);
    expect(screen.getByRole('button', { name: /yes/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /no/i })).toBeInTheDocument();
  });
  test('yes and no initially do not have selected class name', () => {
    render(<TestComponent />);
    expect(screen.getByRole('button', { name: /yes/i })).not.toHaveClass(/selected/i);
  });
  test('renders an id we can use during testing', () => {
    render(<TestComponent />);
    expect(screen.getByTestId('bool-node-1-content')).toBeInTheDocument();
  });
  test('By default the class contains no status styling', () => {
    render(<TestComponent />);
    expect(screen.getByTestId('bool-node-1-content')).not.toHaveClass(/animated/i);
  });
  describe('Help Icon', () => {
    test('not displayed when falsy', () => {
      render(
        <ReactFlowProvider>
          <BoolNode
            id={'1'}
            dragging={false}
            selected={false}
            type={''}
            zIndex={0}
            isConnectable={false}
            xPos={0}
            yPos={0}
            data={{
              label: 'this is a question?',
              yesId: '2',
              noId: '3',
              children: [],
              status: 'chosen',
              help: false,
            }}
          />
        </ReactFlowProvider>
      );
      expect(screen.queryByLabelText(/help/i)).not.toBeInTheDocument();
    });
    test('displayed icon when truthy', () => {
      render(
        <ReactFlowProvider>
          <BoolNode
            id={'1'}
            dragging={false}
            selected={false}
            type={''}
            zIndex={0}
            isConnectable={false}
            xPos={0}
            yPos={0}
            data={{
              label: 'this is a question?',
              yesId: '2',
              noId: '3',
              children: [],
              status: 'chosen',
              help: true,
            }}
          />
        </ReactFlowProvider>
      );
      expect(screen.queryByLabelText(/more information/i)).toBeInTheDocument();
    });
    test('ToDo: handles onClick events', async () => {
      // ToDo: This test does not assert anything
      const user = userEvent.setup();
      render(
        <ReactFlowProvider>
          <BoolNode
            id={'1'}
            dragging={false}
            selected={false}
            type={''}
            zIndex={0}
            isConnectable={false}
            xPos={0}
            yPos={0}
            data={{
              label: 'this is a question?',
              yesId: '2',
              noId: '3',
              children: [],
              status: 'chosen',
              help: true,
            }}
          />
        </ReactFlowProvider>
      );
      const helpIcon = screen.getByLabelText(/more information/i);
      await user.click(helpIcon);
    });
  });
});
