import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Edge } from 'reactflow';
import { createTreeEdge, hideTargetEdges, TreeNode, useTreeStore } from 'store';
import { describe, expect, test } from 'vitest';

const createMockEdge = (source: string, target: string, overWrites: Partial<Edge>): Edge => {
  return {
    id: `${source}-${target}`,
    hidden: true,
    source,
    target,
    ...overWrites,
  };
};

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
  test('createManifestEdge takes 2 Id and returns an edge', () => {
    const sourceId = '2';
    const targetId = '3';
    const edge = createTreeEdge(sourceId, targetId);
    expect(typeof edge).toBe('object');
    expect(edge.source).toBe(sourceId);
    expect(edge.target).toBe(targetId);
  });
  test('setHiddenEdges hides all edges that lead to target Ids', () => {
    const id2 = '2';
    const id3 = '3';
    const targetNodeIds = [id2, id3];
    const edges: Array<Edge> = [
      // source, target, overwrites
      createMockEdge('1', '2', { hidden: false }),
      createMockEdge('2', '3', { hidden: false }),
      createMockEdge('2', '4', { hidden: false }),
      createMockEdge('4', '5', { hidden: false }),
    ];
    const updatedEdges = hideTargetEdges({ targetNodeIds, edges });
    expect(updatedEdges).toHaveLength(4);
    const hiddenEdges = updatedEdges.filter((edge) => edge.target === id2 || edge.target === id3);
    hiddenEdges.forEach((edge) => expect(edge.hidden).toBe(true));
  });
});
