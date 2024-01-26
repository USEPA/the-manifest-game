import { useEffect } from 'react';
import { DecisionTree, DecisionTreeNode, useTreeStore } from 'store';

const treeToNodes = (tree: DecisionTree): Array<DecisionTreeNode> => {
  return Object.values(tree).map((node) => ({
    id: node.id,
    data: node.data,
    type: node.type ?? 'default',
    hidden: node.hidden,
    connectable: false,
    draggable: false,
    position: { x: 0, y: 0 }, // position is set by our layout library, this is a dummy value
  }));
};

export const useTreeNodes = (initialTree?: DecisionTree) => {
  const {
    nodes,
    tree,
    setTree,
    setNodes,
    hideNode: hideStoreNode,
    showNode: showStoreNode,
    hideDescendantEdges,
    hideDescendantNodes: hideStoreDescendantNodes,
    showTargetEdges,
    hideTargetEdges,
  } = useTreeStore((state) => state);

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

  /**
   * show a node and the edge leading to it */
  const showNode = (nodeId: string) => {
    showStoreNode(nodeId);
    showTargetEdges(nodeId);
  };

  useEffect(() => {
    if (initialTree) {
      setNodes(treeToNodes(initialTree));
      setTree(initialTree);
    }
  }, [initialTree, setNodes, setTree]);

  useEffect(() => {
    setNodes(treeToNodes(tree));
  }, [tree, setNodes]);

  return {
    nodes,
    setTree,
    tree,
    showNode,
    hideNode,
    hideDescendants,
  } as const;
};
