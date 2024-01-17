import { useManifestTree } from "hooks/useManifestTree";
import React from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
} from "reactflow";
import { manifestNodes2 } from "./nodes";

export const Tree = () => {
  const { nodes, edges, onConnect, onEdgesChange, onClick } =
    useManifestTree(manifestNodes2);

  console.log("treeNodes", nodes);
  console.log("treeEdges", edges);

  return (
    <>
      <div style={{ width: "100vw", height: "100vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
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
