import "@testing-library/jest-dom";
import { createManifestEdge } from "components/services/manifestEdges";
import { describe, expect, test } from "vitest";

describe("manifestEdges service", () => {
  test("createManifestEdge takes 2 ID and returns an edge", () => {
    const sourceId = "2";
    const targetId = "3";
    const edge = createManifestEdge(sourceId, targetId);
    expect(typeof edge).toBe("object");
    expect(edge.source).toBe(sourceId);
    expect(edge.target).toBe(targetId);
  });
});
