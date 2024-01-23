import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Edge } from 'reactflow';
import { describe, expect, test } from 'vitest';
import useTreeStore, { TreeNode } from 'store/treeStore';

interface TestComponentProps {
  edges?: Edge[];
  treeNodeUpdates?: Partial<TreeNode>;
}

const TestComponent = ({ edges, treeNodeUpdates }: TestComponentProps) => {
  const globalEdges = useTreeStore((state) => state.edges);
  const { decisionTree, setEdges, nodes, updateNode } = useTreeStore((state) => state);

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
      {decisionTree && treeNodeUpdates && (
        <>
          <p>Decision tree</p>
          {Object.values(decisionTree).map((node) => (
            <p key={node.id}>
              {node.id}: {node.data.label}
            </p>
          ))}
          <button onClick={() => updateNode(treeNodeUpdates)}>Update node</button>
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
  test('allows tree nodes to be updated', async () => {
    const nodeId = '1';
    useTreeStore.setState({ decisionTree: { [nodeId]: { id: nodeId, data: { label: 'foo' } } } });
    render(<TestComponent treeNodeUpdates={{ id: nodeId, data: { label: 'bar' } }} />);
    expect(screen.getByText(/foo/i)).toBeInTheDocument();
    await userEvent.click(screen.getByText(/update node/i));
    expect(await screen.findByText(/bar/i)).toBeInTheDocument();
  });
});
