import { useTreeViewport } from 'hooks/useTreeViewport/useTreeViewport';
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
export const useDagStore = (initialTree?: PositionUnawareDecisionTree) => {
  const { setCenter, getZoom } = useTreeViewport();
  const {
    decisionTree,
    setDecisionTree: setTree,
    showDagChildren,
    showDagNode,
    hideDagDescendants,
    hideDagNode,
    dagNodes,
    dagEdges,
    hideDagNiblings,
    onNodesChange,
    onEdgesChange,
  } = useStore((state) => state);

  /** show a node's direct children and the edges leading to them */
  const showChildren = (nodeId: string) => {
    showDagChildren(nodeId);
    setCenter(decisionTree[nodeId].position.x, decisionTree[nodeId].position.y);
  };

  /** hide a node's descendant nodes and edges, but not the node itself */
  const hideDescendants = (nodeId: string) => {
    hideDagDescendants(nodeId);
  };

  /** hide a node and all descendant nodes and edges */
  const hideNode = (nodeId: string) => {
    hideDagNode(nodeId);
    hideDagDescendants(nodeId);
  };

  /** hide a node's nieces/nephews (the descendants of its siblings) */
  const hideNiblings = (nodeId: string) => {
    hideDagNiblings(nodeId);
  };

  /** show a node and the edge leading to it */
  const showNode = (nodeId: string, options?: ShowDagNodeOptions) => {
    showDagNode(nodeId, options);
    setCenter(decisionTree[nodeId].position.x + 50, decisionTree[nodeId].position.y + 50, {
      zoom: getZoom(),
      duration: 1000,
    });
  };

  useEffect(() => {
    if (initialTree) {
      setTree(initialTree);
      showDagNode(Object.keys(initialTree)[0]);
      Object.values(initialTree).forEach((node) => {
        if (!node.hidden) showDagNode(node.id);
      });
    }
  }, [initialTree, setTree, showDagNode]);

  return {
    tree: decisionTree,
    showNode,
    hideNode,
    hideDescendants,
    hideNiblings,
    showChildren,
    edges: dagEdges,
    nodes: dagNodes,
    onEdgesChange,
    onNodesChange,
  } as const;
};
