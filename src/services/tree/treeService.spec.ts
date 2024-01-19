import "@testing-library/jest-dom";
import { Edge } from "reactflow";
import { ManifestNode, ManifestTree, Tree } from "services/tree/treeService";
import { describe, expect, test } from "vitest";

const createMockEdge = (
  source: string,
  target: string,
  overWrites: Partial<Edge>,
): Edge => {
  return {
    id: `${source}-${target}`,
    hidden: true,
    source,
    target,
    ...overWrites,
  };
};

const createMockNode = (overWrites: Partial<ManifestNode>): ManifestNode => {
  return {
    id: "1",
    hidden: true,
    connectable: false,
    draggable: false,
    data: { label: "foo" },
    ...overWrites,
  };
};

describe("Tree services", () => {
  test("createManifestNode requires an ID", () => {
    const node = Tree.createManifestNode({ id: "2" });
    expect(node.id).toBe("2");
  });
  test("flattens nested nodes", () => {
    const parentId = "1";
    const childId = "2";
    const nodes = [
      Tree.createManifestNode({
        id: parentId,
        children: [Tree.createManifestNode({ id: childId })],
      }),
    ];
    const nodeIds = nodes.map((node) => node.id);
    expect(nodeIds).toContain(parentId);
    expect(nodeIds).not.toContain(childId);
    const flatNodes = Tree.buildTreeNodes(nodes);
    const flatNodeIds = flatNodes.map((node) => node.id);
    expect(flatNodeIds).toContain(parentId);
    expect(flatNodeIds).toContain(childId);
  });
  test("createManifestEdge takes 2 ID and returns an edge", () => {
    const sourceId = "2";
    const targetId = "3";
    const edge = Tree.createManifestEdge(sourceId, targetId);
    expect(typeof edge).toBe("object");
    expect(edge.source).toBe(sourceId);
    expect(edge.target).toBe(targetId);
  });
  test("setHiddenEdges hides all edges that lead to target IDs", () => {
    const id2 = "2";
    const id3 = "3";
    const targetNodeIDs = [id2, id3];
    const edges: Array<Edge> = [
      // source, target, overwrites
      createMockEdge("1", "2", { hidden: false }),
      createMockEdge("2", "3", { hidden: false }),
      createMockEdge("2", "4", { hidden: false }),
      createMockEdge("4", "5", { hidden: false }),
    ];
    const updatedEdges = Tree.setHiddenEdges({ targetNodeIDs, edges });
    expect(updatedEdges).toHaveLength(4);
    const hiddenEdges = updatedEdges.filter(
      (edge) => edge.target === id2 || edge.target === id3,
    );
    hiddenEdges.forEach((edge) => expect(edge.hidden).toBe(true));
  });
  test("expandNode set children nodes hidden to false", () => {
    const mockChild1 = createMockNode({ id: "2", hidden: true });
    const mockChild2 = createMockNode({ id: "3", hidden: true });
    const parentNode = createMockNode({
      id: "1",
      children: [mockChild1, mockChild2],
      hidden: false,
    });
    const mockTree: ManifestTree = {
      [parentNode.id]: parentNode,
      [mockChild1.id]: mockChild1,
      [mockChild2.id]: mockChild2,
    };
    const updatedTree = Tree.expandNode({ tree: mockTree, node: parentNode });
    expect(updatedTree[parentNode.id].hidden).toBe(false);
    expect(updatedTree[mockChild1.id].hidden).toBe(false);
    expect(updatedTree[mockChild2.id].hidden).toBe(false);
  });
  test("mapTreeToNodes returns an array", () => {
    const mockChild3 = createMockNode({ id: "4", hidden: true });
    const mockChild1 = createMockNode({
      id: "2",
      hidden: true,
      children: [mockChild3],
    });
    const mockChild2 = createMockNode({ id: "3", hidden: true });
    const parentNode = createMockNode({
      id: "1",
      children: [mockChild1, mockChild2],
      hidden: false,
    });
    const mockTree: ManifestTree = {
      [parentNode.id]: parentNode,
      [mockChild1.id]: mockChild1,
      [mockChild2.id]: mockChild2,
      [mockChild3.id]: mockChild3,
    };
    const nodeList = Tree.mapTreeToNodes(mockTree);
    expect(nodeList).toHaveLength(4);
  });
});
