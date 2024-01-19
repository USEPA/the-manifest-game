import { getLayoutElements } from "components/Tree/layout";
import { useDecisionTree } from "hooks";
import React from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
} from "reactflow";
import { dummyManifestTree } from "./nodes";

export const Tree = () => {
  const {
    nodes: rawNodes,
    edges: rawEdges,
    onClick,
  } = useDecisionTree(dummyManifestTree);

  const { nodes, edges } = getLayoutElements(rawNodes, rawEdges);

  return (
    <>
      <div style={{ width: "100vw", height: "100vh" }}>
        <ReactFlow nodes={nodes} edges={edges} onNodeClick={onClick}>
          <Background variant={BackgroundVariant.Dots} />
          <MiniMap nodeStrokeWidth={3} />
          <Controls />
        </ReactFlow>
      </div>
    </>
  );
};
