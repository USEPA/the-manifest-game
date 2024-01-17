import React, { useCallback } from "react";
import ReactFlow, {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  MiniMap,
  useEdgesState,
  useNodesState,
} from "reactflow";
import { manifestEdges, ManifestNode, manifestNodes } from "./nodes";

const getNodeTargets = ({
  edges,
  source,
}: {
  edges: Array<Edge>;
  source: string;
}): Array<string> => {
  return edges
    .filter((edge) => edge.source === source)
    .map((edge) => edge.target);
};

const setHiddenNodes = ({
  targets,
  nodes,
  expanded,
}: {
  targets: Array<string>;
  nodes: Array<ManifestNode>;
  expanded: boolean;
}): Array<ManifestNode> => {
  return nodes.map((node) => {
    if (targets.includes(node.id)) {
      return { ...node, hidden: !expanded };
    }
    return node;
  });
};

const setExpanded = ({
  source,
  nodes,
}: {
  source: string;
  nodes: Array<ManifestNode>;
}): Array<ManifestNode> => {
  return nodes.map((node) => {
    if (node.id === source) {
      return { ...node, expanded: !node.expanded };
    }
    return node;
  });
};

export const Tree = () => {
  const [nodes, setNodes] = useNodesState(manifestNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(manifestEdges);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onClick = useCallback(
    (event: React.MouseEvent, node: ManifestNode) => {
      const targets: Array<string> = getNodeTargets({ edges, source: node.id });
      console.log("targets", targets);
      const intermediaNodes = setExpanded({ source: node.id, nodes });
      const newNodes = setHiddenNodes({
        nodes: intermediaNodes,
        targets,
        expanded: !node.expanded,
      });
      const updatedEdges = edges.map((edge) => {
        if (targets.includes(edge.target)) {
          return { ...edge, hidden: node.expanded };
        }
        return edge;
      });
      setEdges(updatedEdges);
      setNodes(newNodes);
    },
    [edges, nodes, setEdges, setNodes],
  );

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
