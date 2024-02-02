import { useEffect } from 'react';
import useStore, { DecisionTree } from 'store';
import { ShowDagNodeOptions } from 'store/dagSlice';

/**
 * useTreeNodes
 *
 * custom hook that wraps around the tree store to provide a simplified interface for common tasks
 * such as showing and hiding nodes and edges
 * @param initialTree
 */
export const useTreeNodes = (initialTree?: DecisionTree) => {
  const { dagTree, setDagTree, showDagChildren, showDagNode, hideDagDescendants, hideDagNode } =
    useStore((state) => state);

  /** show a node's direct children and the edges leading to them */
  const showChildren = (nodeId: string) => {
    showDagChildren(nodeId);
  };

  /** hide a node's descendant nodes and edges, but not the node itself */
  const hideDescendants = (nodeId: string) => {
    hideDagDescendants(nodeId);
  };

  /** hide a node and all descendant nodes and edges */
  const hideNode = (nodeId: string) => {
    console.log('hideNode', nodeId);
    hideDagNode(nodeId);
  };

  /** show a node and the edge leading to it */
  const showNode = (nodeId: string, options?: ShowDagNodeOptions) => {
    showDagNode(nodeId, options);
  };

  useEffect(() => {
    if (initialTree) {
      setDagTree(initialTree);
      showDagNode(Object.keys(initialTree)[0]);
    }
  }, [initialTree, setDagTree, showDagNode]);

  return {
    tree: dagTree,
    showNode,
    hideNode,
    hideDescendants,
    showChildren,
  } as const;
};
