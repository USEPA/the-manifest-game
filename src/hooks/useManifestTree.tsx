import { tree } from "components/services/treeService";
import { ManifestNode } from "components/Tree/nodes";
import React, { useCallback } from "react";
import {
  addEdge,
  Connection,
  Edge,
  useEdgesState,
  useNodesState,
} from "reactflow";

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

/**
 * useManifestNodes
 *
 * logic and interface for managing the interactive e-Manifest decision tree
 * returns an array of nodes to be used with the React Flow library and getter/setter functions
 * @param initialNodes
 */
export const useManifestTree = (initialNodes: Array<ManifestNode>) => {
  const [flowNodes, setFlowNodes] = useNodesState(
    tree.flattenTreeNodes(initialNodes),
  );
  const [flowEdges, setFlowEdges, onFlowEdgesChange] = useEdgesState(
    tree.createTreeEdges(initialNodes),
  );

  const onConnect = useCallback(
    (params: Edge | Connection) => setFlowEdges((eds) => addEdge(params, eds)),
    [setFlowEdges],
  );

  const onClick = useCallback(
    (event: React.MouseEvent, node: ManifestNode) => {
      const targets: Array<string> = getNodeTargets({
        edges: flowEdges,
        source: node.id,
      });
      console.log("targets", targets);
      const intermediaNodes = setExpanded({
        source: node.id,
        nodes: flowNodes,
      });
      const newNodes = setHiddenNodes({
        nodes: intermediaNodes,
        targets,
        expanded: !node.expanded,
      });
      const updatedEdges = flowEdges.map((edge) => {
        if (targets.includes(edge.target)) {
          return { ...edge, hidden: node.expanded };
        }
        return edge;
      });
      setFlowEdges(updatedEdges);
      setFlowNodes(newNodes);
    },
    [flowEdges, flowNodes, setFlowNodes, setFlowEdges],
  );

  return {
    nodes: flowNodes,
    setNodes: setFlowNodes,
    edges: flowEdges,
    setEdges: setFlowEdges,
    onConnect,
    onEdgesChange: onFlowEdgesChange,
    onClick,
  } as const;
};
