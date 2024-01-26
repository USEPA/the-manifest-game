import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Edge } from 'reactflow';
import { TreeNode, useTreeStore } from 'store';
import { describe, expect, test } from 'vitest';

interface TestComponentProps {
  edges?: Edge[];
  treeNodeUpdates?: Partial<TreeNode>;
}

const TestComponent = ({ edges }: TestComponentProps) => {
  const globalEdges = useTreeStore((state) => state.edges);
  const { setEdges, nodes } = useTreeStore((state) => state);

  return (
    <>
      <div>
        {nodes.map((node) => (
          <p key={node.id}>{node.id}</p>
        ))}
      </div>
      {edges && (
        <>
          <button onClick={() => setEdges(edges)}>Set edges</button>
          {globalEdges.map((edge) => (
            <p key={edge.id}>edge: {edge.id}</p>
          ))}
        </>
      )}
    </>
  );
};

describe('Tree store', () => {
  test('sets nodes', () => {
    const nodeId = '1';
    useTreeStore.setState({ nodes: [{ id: nodeId, position: { x: 100, y: 200 }, data: {} }] });
    render(<TestComponent />);
    expect(screen.getByText(nodeId)).toBeInTheDocument();
  });
  test('sets edges', async () => {
    const myEdge = { id: '1', source: '1', target: '2' };
    render(<TestComponent edges={[myEdge]} />);
    expect(screen.queryByText(/edge: 1/i)).not.toBeInTheDocument();
    await userEvent.click(screen.getByText(/set edges/i));
    expect(screen.getByText(/edge: 1/i)).toBeInTheDocument();
  });
});
