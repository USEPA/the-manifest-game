import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import useTreeStore from 'store/treeStore';

const TestComponent = () => {
  const nodes = useTreeStore((state) => state.nodes);

  return (
    <div>
      {nodes.map((node) => (
        <p key={node.id}>{node.id}</p>
      ))}
    </div>
  );
};

describe('Tree store', () => {
  test('saves nodes to global state on change', () => {
    const nodeId = '1';
    useTreeStore.setState({ nodes: [{ id: nodeId, position: { x: 100, y: 200 }, data: {} }] });
    render(<TestComponent />);
    expect(screen.getByText(nodeId)).toBeInTheDocument();
  });
});
