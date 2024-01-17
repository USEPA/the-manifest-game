import "@testing-library/jest-dom";
import { createManifestNode } from "components/services";
import { describe, expect, test } from "vitest";

describe("nodes service", () => {
  test("createManifestNode requires an ID", () => {
    const node = createManifestNode({ id: "2" });
    expect(node.id).toBe("2");
  });
});
