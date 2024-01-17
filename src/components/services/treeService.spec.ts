import "@testing-library/jest-dom";
import { tree } from "components/services/treeService";
import { describe, expect, test } from "vitest";

describe("nodes service", () => {
  test("createManifestNode requires an ID", () => {
    const node = tree.createManifestNode({ id: "2" });
    expect(node.id).toBe("2");
  });
  test("flattens nested nodes", () => {
    const parentId = "1";
    const childId = "2";
    const nodes = [
      tree.createManifestNode({
        id: parentId,
        children: [tree.createManifestNode({ id: childId })],
      }),
    ];
    const nodeIds = nodes.map((node) => node.id);
    expect(nodeIds).toContain(parentId);
    expect(nodeIds).not.toContain(childId);
    const flatNodes = tree.flattenTreeNodes(nodes);
    const flatNodeIds = flatNodes.map((node) => node.id);
    expect(flatNodeIds).toContain(parentId);
    expect(flatNodeIds).toContain(childId);
  });
  describe("manifestEdges service", () => {
    test("createManifestEdge takes 2 ID and returns an edge", () => {
      const sourceId = "2";
      const targetId = "3";
      const edge = tree.createManifestEdge(sourceId, targetId);
      expect(typeof edge).toBe("object");
      expect(edge.source).toBe(sourceId);
      expect(edge.target).toBe(targetId);
    });
  });
});
