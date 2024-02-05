import { useEffect } from 'react';
import useStore from 'store';
import { PositionUnawareDecisionTree, ShowDagNodeOptions } from 'store/DagSlice/dagSlice';

/**
 * useTreeNodes
 *
 * custom hook that wraps around the tree store to provide a simplified interface for common tasks
 * such as showing and hiding nodes and edges
 * @param initialTree
 */
export const useDAG = (initialTree?: PositionUnawareDecisionTree) => {
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
    hideDagNode(nodeId);
  };

  /** show a node and the edge leading to it */
  const showNode = (nodeId: string, options?: ShowDagNodeOptions) => {
    showDagNode(nodeId, options);
  };

  useEffect(() => {
    if (initialTree) {
      setDagTree(initialTree);
      // ToDo: this is a temporary solution to show the first node in the tree
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
