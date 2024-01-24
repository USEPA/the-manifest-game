import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { useTreeNodes } from 'hooks/useTreeNodes/useTreeNodes';
import { DecisionTree } from 'store/treeStore';
import { afterEach, describe, expect, test } from 'vitest';

afterEach(() => cleanup());

interface TestComponentProps {
  initialTree?: DecisionTree;
}

const TestComponent = ({ initialTree }: TestComponentProps) => {
  const { nodes, tree } = useTreeNodes(initialTree);

  return (
    <>
      <div>
        {nodes.map((node) => (
          <p key={node.id}>node id: {node.id}</p>
        ))}
      </div>
      <div>
        {Object.values(tree).map((node) => (
          <p key={node.id}>tree id: {node.id}</p>
        ))}
      </div>
    </>
  );
};

describe('useTreeNodes', () => {
  test('accepts a initial DecisionTree and updates the store', () => {
    const initialTree: DecisionTree = { '1': { id: '1', data: { label: 'foo' } } };
    render(<TestComponent initialTree={initialTree} />);
    expect(screen.getByText(/tree id: 1/i)).toBeInTheDocument();
  });
  test('setting an initial tree creates an array of react flow nodes', () => {
    const initialTree: DecisionTree = { '1': { id: '1', data: { label: 'foo' } } };
    render(<TestComponent initialTree={initialTree} />);
    expect(screen.getByText(/node id: 1/i)).toBeInTheDocument();
  });
});
