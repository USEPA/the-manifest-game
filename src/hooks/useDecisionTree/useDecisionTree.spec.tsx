import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useDecisionTree } from 'hooks/useDecisionTree/useDecisionTree';
import { ReactFlowProvider } from 'reactflow';
import { DecisionTree } from 'store';
import { afterEach, describe, expect, test } from 'vitest';

afterEach(() => cleanup());

interface TestComponentProps {
  initialTree?: DecisionTree;
  showNodeId?: string;
  hideNodeId?: string;
}

const TestComponent = ({ initialTree, hideNodeId = '1', showNodeId = '1' }: TestComponentProps) => {
  const { retractDecision, makeDecision, tree } = useDecisionTree(initialTree);

  return (
    <>
      <div>
        {Object.values(tree).map((myNode) => (
          <p key={myNode.id}>{myNode.hidden ? null : `node id: ${myNode.id}`}</p>
        ))}
      </div>
      <button onClick={() => retractDecision(hideNodeId)}>hide node</button>
      <button onClick={() => makeDecision('1', showNodeId)}>show node</button>
    </>
  );
};

describe('useDecisionTree', () => {
  test('accepts a initial DecisionTree and updates the store', () => {
    const initialTree: DecisionTree = {
      '1': {
        id: '1',
        data: { label: 'foo', children: [] },
        hidden: false,
        position: { x: 0, y: 0, rank: 0 },
      },
    };
    render(
      <ReactFlowProvider>
        <TestComponent initialTree={initialTree} />
      </ReactFlowProvider>
    );
    expect(screen.getByText(/node id: 1/i)).toBeInTheDocument();
  });
  test('un-hides nodes based on the user input', async () => {
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
    render(
      <ReactFlowProvider>
        <TestComponent initialTree={initialTree} showNodeId={childId} />
      </ReactFlowProvider>
    );
    expect(screen.queryByText(/node id: 2/i)).not.toBeInTheDocument();
    await user.click(screen.getByText(/show node/i));
    expect(screen.queryByText(/node id: 2/i)).toBeInTheDocument();
  });
});
