import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useDAG } from 'hooks/useDAG/useDAG';
import { DecisionTree } from 'store';
import { afterEach, describe, expect, test } from 'vitest';

afterEach(() => cleanup());

interface TestComponentProps {
  initialTree?: DecisionTree;
  showNodeId?: string;
  hideNodeId?: string;
}

const TestComponent = ({ initialTree, hideNodeId = '1', showNodeId = '1' }: TestComponentProps) => {
  const { tree, hideNode, showNode } = useDAG(initialTree);

  return (
    <>
      <div>
        {Object.values(tree).map((myNode) => (
          <p key={myNode.id}>{myNode.hidden ? null : `node id: ${myNode.id}`}</p>
        ))}
      </div>
      <button onClick={() => hideNode(hideNodeId)}>hide node</button>
      <button onClick={() => showNode(showNodeId)}>show node</button>
    </>
  );
};

describe('useTreeNodes', () => {
  test('accepts a initial DecisionTree and updates the store', () => {
    const initialTree: DecisionTree = {
      '1': {
        id: '1',
        data: { label: 'foo', children: [] },
        hidden: false,
        position: { x: 0, y: 0, rank: 0 },
      },
    };
    render(<TestComponent initialTree={initialTree} />);
    expect(screen.getByText(/node id: 1/i)).toBeInTheDocument();
  });
  test('hideNode hides a node in the tree from view', async () => {
    const user = userEvent.setup();
    const initialTree: DecisionTree = {
      '1': {
        id: '1',
        hidden: false,
        data: { label: 'foo', children: [] },
        position: { x: 0, y: 0, rank: 0 },
      },
    };
    render(<TestComponent initialTree={initialTree} />);
    expect(screen.getByText(/node id: 1/i)).toBeInTheDocument();
    await user.click(screen.getByText(/hide node/i));
    expect(screen.queryByText(/node id: 1/i)).not.toBeInTheDocument();
  });
  test('showNode sets hidden to false for the node ID called', async () => {
    const user = userEvent.setup();
    const parentId = '1';
    const childId = '2';
    const initialTree: DecisionTree = {
      [parentId]: {
        id: parentId,
        hidden: false,
        data: { label: 'foo', children: [childId] },
        position: { x: 0, y: 0, rank: 0 },
      },
      [childId]: {
        id: childId,
        hidden: true,
        data: { label: 'foo', children: [] },
        position: { x: 0, y: 0, rank: 0 },
      },
    };
    render(<TestComponent initialTree={initialTree} showNodeId={childId} />);
    expect(screen.queryByText(/node id: 2/i)).not.toBeInTheDocument();
    await user.click(screen.getByText(/show node/i));
    expect(screen.queryByText(/node id: 2/i)).toBeInTheDocument();
  });
});
