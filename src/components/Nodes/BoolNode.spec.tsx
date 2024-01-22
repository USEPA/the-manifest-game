import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { BoolNode } from "components/Nodes/BoolNode";
import { ReactFlowProvider } from "reactflow";
import { afterEach, describe, expect, test } from "vitest";

afterEach(() => {});

describe("BoolNode", () => {
  test("renders a node", () => {
    const question = "what site type?";
    render(
      <ReactFlowProvider>
        <BoolNode
          id={""}
          data={{
            question,
          }}
          selected={false}
          type={""}
          zIndex={0}
          isConnectable={false}
          xPos={0}
          yPos={0}
          dragging={false}
        />
      </ReactFlowProvider>,
    );
    expect(screen.getByText(question)).toBeInTheDocument();
  });
});
