import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { Tree } from 'components/Tree/Tree';
import { useDecisionTree } from 'hooks';
import { ReactFlowProvider } from 'reactflow';
import { DecisionTree } from 'store';
import { PositionUnawareDecisionTree } from 'store/DagSlice/dagSlice';
import { afterEach, describe, expect, it } from 'vitest';

afterEach(() => cleanup());

const TestComponent = ({ tree }: { tree?: PositionUnawareDecisionTree }) => {
  const { nodes, edges, onClick } = useDecisionTree(tree);
  const myTree = tree || {
    ['1']: {
      id: '1',
      data: {
        label: 'this is a question?',
        yesId: '2',
        noId: '3',
        children: [],
      },
      position: { x: 0, y: 0 },
      type: 'BoolNode',
      hidden: false,
    },
    ['2']: {
      id: '2',
      data: { label: 'this is an answer?', children: [] },
      position: { x: 0, y: 0 },
      type: 'default',
      hidden: false,
    },
    ['3']: {
      id: '3',
      data: { label: 'this is an answer?', children: [] },
      position: { x: 0, y: 0 },
      type: 'default',
      hidden: false,
    },
  };
  return <Tree nodes={nodes} edges={edges} onClick={onClick} />;
};

describe('Tree Component', () => {
  it('renders', () => {
    render(
      <ReactFlowProvider>
        <Tree nodes={[]} edges={[]} onClick={() => undefined} />
      </ReactFlowProvider>
    );
    expect(screen.getByTestId('decision-tree')).toBeInTheDocument();
  });
  it('onClick shows children nodes of unexpanded node', () => {
    const parentId = '1';
    const childId2 = '2';
    const childId3 = '3';
    const tree: DecisionTree = {
      [parentId]: {
        id: parentId,
        data: {
          label: 'this is a question?',
          children: ['2', '3'],
        },
        position: { x: 0, y: 0 },
        type: 'default',
        hidden: false,
      },
      [childId2]: {
        id: childId2,
        data: { label: 'this is an answer?', children: [] },
        position: { x: 0, y: 0 },
        type: 'default',
        hidden: true,
      },
      [childId3]: {
        id: childId3,
        data: { label: 'this is an answer?', children: [] },
        position: { x: 0, y: 0 },
        type: 'default',
        hidden: true,
      },
    };
    render(
      <ReactFlowProvider>
        <TestComponent tree={tree} />
      </ReactFlowProvider>
    );
    const parentNode = screen.queryByTestId(`node-${parentId}`);
    expect(parentNode).toBeInTheDocument();
    expect(screen.queryByTestId(`node-${childId2}`)).not.toBeInTheDocument();
    expect(screen.queryByTestId(`node-${childId3}`)).not.toBeInTheDocument();
    fireEvent.click(parentNode!);
    expect(screen.queryByTestId(`node-${childId2}`)).toBeInTheDocument();
    expect(screen.queryByTestId(`node-${childId3}`)).toBeInTheDocument();
  });
});
