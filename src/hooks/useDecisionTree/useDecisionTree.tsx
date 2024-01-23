import React, { useCallback, useEffect, useState } from 'react';
import { useEdgesState, useNodesState } from 'reactflow';
import { Tree } from 'services';
import { ManifestNode, ManifestTree } from 'services/tree/treeService';
import { useTreeStore } from 'store/treeStore';

/**
 * useManifestTree
 *
 * logic and interface for managing the interactive e-Manifest decision tree
 * returns an array of nodes to be used with the React Flow library and getter/setter functions
 * @param manifestTree
 */
export const useDecisionTree = (manifestTree: Array<ManifestNode>) => {
  const { nodes, setNodes } = useTreeStore((state) => ({
    nodes: state.nodes,
    setNodes: state.setNodes,
  }));

  const { edges, setEdges } = useTreeStore((state) => ({
    edges: state.edges,
    setEdges: state.setEdges,
  }));

  const { tree, setTree } = useTreeStore((state) => ({
    tree: state.tree,
    setTree: state.setTree,
  }));

  useEffect(() => {
    setTree(Tree.flattenNodesToObject(manifestTree));
    setNodes(Tree.buildTreeNodes(manifestTree));
    setEdges(Tree.buildTreeEdges(manifestTree));
  }, [manifestTree, setEdges, setNodes, setTree]);

  useEffect(() => {
    setNodes(Tree.mapTreeToNodes(tree));
  }, [tree, setNodes]);

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
        setEdges(
          Tree.setHiddenEdges({
            edges,
            targetNodeIDs: childrenIds,
            hidden: true,
          })
        );
      } else {
        // if node is closed, open it and show direct children
        const childrenIds = Tree.getChildrenIds({ tree, id: node.id });
        setTree(Tree.expandNode({ tree, node }));
        setEdges(
          Tree.setHiddenEdges({
            edges,
            targetNodeIDs: childrenIds,
            hidden: false,
          })
        );
      }
    },
    [tree, edges, setEdges]
  );

  return {
    nodes,
    edges,
    onClick,
  } as const;
};
