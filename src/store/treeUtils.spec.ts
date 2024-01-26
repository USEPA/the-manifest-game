import '@testing-library/jest-dom';
import { Edge } from 'reactflow';
import { DecisionTree, TreeNode } from 'store/treeStore';
import { describe, expect, test } from 'vitest';
import { createTreeEdge, hideDescendantNodes, hideTargetEdges } from './treeUtils';

const createMockEdge = (source: string, target: string, overWrites: Partial<Edge>): Edge => {
  return {
    id: `${source}-${target}`,
    hidden: true,
    source,
    target,
    ...overWrites,
  };
};

describe('Tree store internals', () => {
  test('takes 2 Id and returns an edge', () => {
    const sourceId = '2';
    const targetId = '3';
    const edge = createTreeEdge(sourceId, targetId);
    expect(typeof edge).toBe('object');
    expect(edge.source).toBe(sourceId);
    expect(edge.target).toBe(targetId);
  });
  test('marks a node as expanded = false', () => {
    const selectedNodeId = '2';
    const childNodeId1 = '3';
    const selectedTreeNode: TreeNode = {
      id: selectedNodeId,
      data: { expanded: true, children: [childNodeId1], label: 'foo' },
    };
    const tree: DecisionTree = {
      [selectedNodeId]: selectedTreeNode,
      [childNodeId1]: {
        id: childNodeId1,
        data: { expanded: true, children: [], label: 'bar' },
      },
    };
    const { newTree, childrenIds } = hideDescendantNodes(tree, selectedTreeNode);
    expect(newTree[selectedNodeId].data.expanded).toBeFalsy(); // selected node should be collapsed
    expect(newTree[childNodeId1].hidden).toBeTruthy(); // the child node(s) should be hidden
    expect(newTree[selectedNodeId].hidden).toBeFalsy(); // the selected node should be visible
    expect(childrenIds).toHaveLength(Object.keys(tree).length - 1); // all affected child node IDs should be returned
  });
  test('hides all edges that lead to target Ids', () => {
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
