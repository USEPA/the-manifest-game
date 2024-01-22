import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { BoolNode } from "components/Nodes/BoolNode";
import { ReactFlowProvider } from "reactflow";
import { afterEach, describe, expect, it } from "vitest";

afterEach(() => {});

describe("BoolNode", () => {
  it("renders a node", () => {
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
  it("renders a yes and no button", () => {
    render(
      <ReactFlowProvider>
        <BoolNode
          id={""}
          data={{
            question: "this is a question?",
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
    expect(screen.getByRole("button", { name: /yes/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /no/i })).toBeInTheDocument();
  });
});
