import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { useDecisionTree } from "hooks/useDecisionTree/useDecisionTree";
import { ManifestNode } from "services/tree/treeService";
import { afterEach, describe, expect, test } from "vitest";

afterEach(() => {});

const TestComponent = ({
  initialNodes,
}: {
  initialNodes?: Array<ManifestNode>;
}) => {
  const initialValue = initialNodes || [];
  const { nodes, edges } = useDecisionTree(initialValue);
  return (
    <>
      <p>nodes</p>
      {nodes.map((node) => (
        <ul key={node.id}>
          <li>id: {node.id}</li>
          <li>hidden: {node.hidden ? "yes" : "no"} </li>
        </ul>
      ))}
      <p>edges</p>
      {edges.map((edge) => (
        <ul key={edge.id}>
          <li>id: {edge.id}</li>
          <li>source: {edge.source}</li>
          <li>target: {edge.target}</li>
        </ul>
      ))}
    </>
  );
};

describe("useDecisionTree", () => {
  test("returns an object containing the nodes", () => {
    const myNodes: Array<ManifestNode> = [
      {
        id: "1",
        expanded: false,
        connectable: false,
        draggable: false,
        position: { x: 100, y: 100 },
        data: { label: "foo" },
      },
    ];
    render(<TestComponent initialNodes={myNodes} />);
    expect(screen.getByText("id: 1")).toBeInTheDocument();
    expect(screen.queryByText("2")).not.toBeInTheDocument();
  });
  test("creates and returns an array of edges", () => {
    const parentId = "1";
    const childId = "2";
    const myNodes: Array<ManifestNode> = [
      {
        id: parentId,
        expanded: false,
        connectable: false,
        draggable: false,
        position: { x: 100, y: 100 },
        data: { label: "foo" },
        children: [
          {
            id: childId,
            connectable: false,
            draggable: false,
            position: { x: 100, y: 100 },
            data: { label: "foo" },
          },
        ],
      },
    ];
    render(<TestComponent initialNodes={myNodes} />);
    expect(screen.getByText(`source: ${parentId}`)).toBeInTheDocument();
    expect(screen.getByText(`target: ${childId}`)).toBeInTheDocument();
  });
});
