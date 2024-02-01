import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BoolNode, BoolNodeData } from 'components/Nodes/BoolNode/BoolNode';
import { NodeProps, ReactFlowProvider } from 'reactflow';
import useStore from 'store';
import { afterEach, describe, expect, it } from 'vitest';

afterEach(() => {});

const TestComponent = ({ overwrites }: { overwrites?: Partial<NodeProps<BoolNodeData>> }) => {
  const props: NodeProps<BoolNodeData> = {
    id: '',
    data: {
      label: 'this is a question?',
      yesId: '',
      noId: '',
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
  return <BoolNode {...props} />;
};

describe('BoolNode', () => {
  it('renders a node', () => {
    const label = 'what site type?';
    render(
      <ReactFlowProvider>
        {/* @ts-expect-error - just need the label*/}
        <TestComponent overwrites={{ data: { label } }} />
      </ReactFlowProvider>
    );
    expect(screen.getByText(label)).toBeInTheDocument();
  });
  it('renders a yes and no button', () => {
    render(
      <ReactFlowProvider>
        <TestComponent />
      </ReactFlowProvider>
    );
    expect(screen.getByRole('button', { name: /yes/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /no/i })).toBeInTheDocument();
  });
  it('clicking yes/no toggles the visibility of the children nodes', async () => {
    const primaryId = '1';
    const yesId = '2';
    const noId = '3';
    useStore.setState({
      tree: {
        [primaryId]: {
          id: primaryId,
          hidden: false,
          data: { label: 'question', children: [yesId, noId] },
        },
        [yesId]: { id: yesId, hidden: true, data: { children: [], label: 'foo' } },
        [noId]: { id: noId, hidden: true, data: { children: [], label: 'bar' } },
      },
    });
    render(
      <ReactFlowProvider>
        <TestComponent
          overwrites={{
            id: primaryId,
            data: { label: 'question', yesId: yesId, noId: noId, children: [yesId, noId] },
          }}
        />
      </ReactFlowProvider>
    );
    await userEvent.click(screen.getByRole('button', { name: /yes/i }));
    expect(useStore.getState().tree[yesId].hidden).toBe(false);
    await userEvent.click(screen.getByRole('button', { name: /no/i }));
    expect(useStore.getState().tree[yesId].hidden).toBe(true);
  });
});
