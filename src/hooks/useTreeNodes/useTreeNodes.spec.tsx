import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useTreeNodes } from 'hooks/useTreeNodes/useTreeNodes';
import { DecisionTree } from 'store';
import { afterEach, describe, expect, test } from 'vitest';

afterEach(() => cleanup());

interface TestComponentProps {
  initialTree?: DecisionTree;
  showNodeId?: string;
  hideNodeId?: string;
}

const TestComponent = ({ initialTree, hideNodeId = '1', showNodeId = '1' }: TestComponentProps) => {
  const { tree, hideNode, showNode } = useTreeNodes(initialTree);

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
      },
    };
    render(<TestComponent initialTree={initialTree} />);
    expect(screen.getByText(/node id: 1/i)).toBeInTheDocument();
  });
  test('hideNode hides a node in the tree from view', async () => {
    const initialTree: DecisionTree = {
      '1': {
        id: '1',
        hidden: false,
        data: { label: 'foo', children: [] },
      },
    };
    render(<TestComponent initialTree={initialTree} />);
    expect(screen.getByText(/node id: 1/i)).toBeInTheDocument();
    await userEvent.click(screen.getByText(/hide node/i));
    expect(screen.queryByText(/node id: 1/i)).not.toBeInTheDocument();
  });
  test('showNode sets hidden to false for the node ID called', async () => {
    const parentId = '1';
    const childId = '2';
    const initialTree: DecisionTree = {
      [parentId]: {
        id: parentId,
        hidden: false,
        data: { label: 'foo', children: [childId] },
      },
      [childId]: {
        id: childId,
        hidden: true,
        data: { label: 'foo', children: [] },
      },
    };
    render(<TestComponent initialTree={initialTree} showNodeId={childId} />);
    expect(screen.queryByText(/node id: 2/i)).not.toBeInTheDocument();
    await userEvent.click(screen.getByText(/show node/i));
    expect(screen.queryByText(/node id: 2/i)).toBeInTheDocument();
  });
});
