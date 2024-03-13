import { useTreeViewport } from 'hooks/useTreeViewport/useTreeViewport';
import { useEffect } from 'react';
import useDecTreeStore, { PositionUnawareDecisionTree, ShowDagNodeOptions } from 'store';

/**
 * custom hook that wraps around the tree store to provide a simplified interface for common tasks
 * such as showing and hiding nodes and edges
 * @param initialTree
 */
export const useTreeStore = (initialTree?: PositionUnawareDecisionTree) => {
  const { setCenter, getZoom } = useTreeViewport();
  const {
    tree,
    setDecisionTree: setStoreTree,
    showChildren: showStoreChildren,
    showNode: showStoreNode,
    hideDescendants: hideStoreDescendants,
    hideNode: hideStoreNode,
    dagNodes,
    dagEdges,
    removeNiblings: removeStoreNiblings,
    onNodesChange,
    onEdgesChange,
    chooseDecision,
  } = useDecTreeStore((state) => state);

  /** show a node's direct children and the edges leading to them */
  const showChildren = (nodeId: string) => {
    showStoreChildren(nodeId);
  };

  /** hide a node's descendant nodes and edges, but not the node itself */
  const hideDescendants = (nodeId: string) => {
    hideStoreDescendants(nodeId);
  };

  /** hide a node and all descendant nodes and edges */
  const hideNode = (nodeId: string) => {
    hideStoreNode(nodeId);
    hideDescendants(nodeId);
  };

  /** hide a node's nieces/nephews (the descendants of its siblings) */
  const hideNiblings = (nodeId: string) => {
    removeStoreNiblings(nodeId);
  };

  /** show a node and the edge leading to it */
  const showNode = (nodeId: string, options?: ShowDagNodeOptions) => {
    showStoreNode(nodeId, options);
    setCenter(tree[nodeId].position.x + 50, tree[nodeId].position.y + 50, {
      zoom: getZoom(),
      duration: 1000,
    });
  };

  useEffect(() => {
    if (initialTree) {
      setStoreTree(initialTree);
      showStoreNode(Object.keys(initialTree)[0]);
      Object.values(initialTree).forEach((node) => {
        if (!node.hidden) showStoreNode(node.id);
      });
    }
  }, [initialTree, setStoreTree, showStoreNode]);

  return {
    tree,
    showNode,
    hideNode,
    hideDescendants,
    hideNiblings,
    showChildren,
    edges: dagEdges,
    nodes: dagNodes,
    onEdgesChange,
    onNodesChange,
    chooseDecision,
  } as const;
};
