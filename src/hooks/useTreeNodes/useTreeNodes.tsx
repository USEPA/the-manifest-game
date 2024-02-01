import { useEffect } from 'react';
import useStore, { DecisionTree } from 'store';

/**
 * useTreeNodes
 *
 * custom hook that wraps around the tree store to provide a simplified interface for common tasks
 * such as showing and hiding nodes and edges
 * @param initialTree
 */
export const useTreeNodes = (initialTree?: DecisionTree) => {
  const {
    tree,
    setTree,
    setDagTree,
    hideNode: hideStoreNode,
    showNode: showStoreNode,
    hideDescendantEdges,
    hideDescendantNodes: hideStoreDescendantNodes,
    showTargetEdges,
    hideTargetEdges,
    showDagChildren,
    showDagNode,
  } = useStore((state) => state);

  /** show a node's direct children and the edges leading to them */
  const showChildren = (nodeId: string) => {
    const node = tree[nodeId];
    const childrenIds = node.data.children;
    const newTree = { ...tree };
    newTree[node.id] = { ...node, data: { ...node.data, expanded: true } };
    childrenIds.forEach((id: string) => {
      showNode(id);
    });
    setTree(newTree);
    setDagTree(newTree);
    childrenIds.forEach((id: string) => showTargetEdges(id));
    showDagChildren(nodeId);
  };

  /** hide a node's descendant nodes and edges, but not the node itself */
  const hideDescendants = (nodeId: string) => {
    hideStoreDescendantNodes(nodeId);
    hideDescendantEdges(nodeId);
  };

  /** hide a node and all descendant nodes and edges */
  const hideNode = (nodeId: string) => {
    hideStoreNode(nodeId);
    hideDescendantEdges(nodeId);
    hideTargetEdges(nodeId);
  };

  /** show a node and the edge leading to it */
  const showNode = (nodeId: string) => {
    showStoreNode(nodeId);
    showTargetEdges(nodeId);
  };

  useEffect(() => {
    if (initialTree) {
      setTree(initialTree);
      setDagTree(initialTree);
      showDagNode(Object.keys(initialTree)[0]);
    }
  }, [initialTree, setTree, setDagTree]);

  return {
    tree,
    showNode,
    hideNode,
    hideDescendants,
    showChildren,
  } as const;
};
