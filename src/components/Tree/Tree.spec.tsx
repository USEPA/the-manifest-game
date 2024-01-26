import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Tree, TreeProps } from 'components/Tree/Tree';
import { ReactFlowProvider } from 'reactflow';
import { afterEach, describe, expect, it } from 'vitest';

afterEach(() => {});

const TestComponent = ({ nodes, edges, onClick }: Partial<TreeProps>) => {
  if (!nodes) {
    nodes = [
      {
        id: '1',
        data: { label: 'this is a question?', yesId: '2', noId: '3', children: [] },
        position: { x: 0, y: 0 },
        type: 'BoolNode',
        hidden: false,
      },
    ];
  }
  if (!edges) {
    edges = [
      {
        id: '1-2',
        source: '1',
        target: '2',
        labelBgStyle: { fill: 'white' },
      },
    ];
  }
  if (!onClick) {
    onClick = () => {};
  }
  return <Tree nodes={nodes} edges={edges} onClick={onClick} />;
};

describe('Tree UI', () => {
  it('renders', () => {
    render(
      <ReactFlowProvider>
        <TestComponent />
      </ReactFlowProvider>
    );
    expect(screen.getByTestId('node-1')).toBeInTheDocument();
  });
  it('renders the given nodes', () => {
    const label1 = 'this is a question?';
    const label2 = 'this is an answer?';
    const myNodes = [
      {
        id: '1',
        data: { label: label1, yesId: '2', noId: '3', children: [] },
        position: { x: 0, y: 0 },
        type: 'BoolNode',
        hidden: false,
      },
      {
        id: '2',
        data: { label: label2, children: [] },
        position: { x: 0, y: 0 },
        type: 'default',
        hidden: false,
      },
    ];
    render(
      <ReactFlowProvider>
        <TestComponent nodes={myNodes} />
      </ReactFlowProvider>
    );
    expect(screen.getByText(label1)).toBeInTheDocument();
    expect(screen.getByText(label2)).toBeInTheDocument();
  });
});
