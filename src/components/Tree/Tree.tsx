import { useManifestTree } from "hooks/useManifestTree";
import React from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
} from "reactflow";
import { dummyManifestTree } from "./nodes";

export const Tree = () => {
  const { nodes, edges, onEdgesChange, onClick } =
    useManifestTree(dummyManifestTree);

  return (
    <>
      <div style={{ width: "100vw", height: "100vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onEdgesChange={onEdgesChange}
          onNodeClick={onClick}
        >
          <Background variant={BackgroundVariant.Dots} />
          <MiniMap nodeStrokeWidth={3} />
          <Controls />
        </ReactFlow>
      </div>
    </>
  );
};
