import { Tree } from "components/services";
import { ManifestNode } from "components/Tree/nodes";
import React, { useCallback, useEffect, useState } from "react";
import { useEdgesState, useNodesState } from "reactflow";

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
 * @param manifestTree
 */
export const useManifestTree = (manifestTree: Array<ManifestNode>) => {
  const [flowNodes, setFlowNodes] = useNodesState(
    Tree.flattenTreeNodes(manifestTree),
  );
  const [flowEdges, setFlowEdges, onFlowEdgesChange] = useEdgesState(
    Tree.createTreeEdges(manifestTree),
  );

  const [tree, setTree] = useState<Record<string, ManifestNode>>(
    Tree.flattenNodesToObject(manifestTree),
  );

  useEffect(() => {
    setFlowNodes(Tree.convertObjectToNodes(tree));
  }, [tree, setFlowNodes]);

  const onClick = useCallback(
    (event: React.MouseEvent, node: ManifestNode) => {
      if (node.expanded) {
        // if node is open, close it and hide all children
        const childrenIds = Tree.getRecursiveChildrenIds(tree, node.id);
        const newTree = { ...tree };
        newTree[node.id] = { ...node, expanded: false };
        childrenIds.forEach((id) => {
          newTree[id].hidden = true;
          newTree[id].expanded = false;
        });
        setTree(newTree);
        setFlowEdges(Tree.setHiddenEdges(flowEdges, childrenIds, true));
      } else {
        // if node is closed, open it and show direct children
        const childrenIds = Tree.getChildrenIds(tree, node.id);
        setTree(Tree.expandNode(tree, node));
        setFlowEdges(Tree.setHiddenEdges(flowEdges, childrenIds, false));
      }
    },
    [tree, flowEdges, setFlowEdges],
  );

  return {
    nodes: flowNodes,
    edges: flowEdges,
    onEdgesChange: onFlowEdgesChange,
    onClick,
  } as const;
};
