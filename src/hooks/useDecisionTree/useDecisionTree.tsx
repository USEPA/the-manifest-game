import { useTreeViewport } from 'hooks/useTreeViewport/useTreeViewport';
import { useEffect } from 'react';
import useDecTreeStore, { PositionUnawareDecisionTree } from 'store';

/**
 * custom hook that wraps around the tree store to provide a simplified interface for common tasks
 * @param initialTree
 * @param pathParam
 */
export const useDecisionTree = (initialTree?: PositionUnawareDecisionTree, pathParam?: string) => {
  const { setCenter, getZoom } = useTreeViewport();
  const {
    tree,
    setDecisionTree,
    showChildren,
    showNode,
    hideDescendants,
    dagNodes,
    dagEdges,
    hideNiblings,
    onNodesChange,
    onEdgesChange,
    addDecisionToPath,
    removeDecisionFromPath,
    getParentVertexId,
    getPath,
  } = useDecTreeStore((state) => state);

  const focusNode = (nodeId: string) => {
    setCenter(tree[nodeId].position.x + 50, tree[nodeId].position.y + 50, {
      zoom: getZoom(),
      duration: 1000,
    });
  };

  useEffect(() => {
    if (initialTree) {
      setDecisionTree(initialTree);
      showNode(Object.keys(initialTree)[0]);
      Object.values(initialTree).forEach((node) => {
        if (!node.hidden) showNode(node.id);
      });
      if (pathParam) {
        const parent = getParentVertexId(pathParam);
        if (parent) addDecisionToPath(parent, pathParam);
        getPath().forEach((decision) => {
          showChildren(decision.nodeId);
        });
      }
    }
  }, [
    getPath,
    showChildren,
    addDecisionToPath,
    initialTree,
    pathParam,
    setDecisionTree,
    showNode,
    getParentVertexId,
  ]);

  const makeDecision = (source: string, target: string) => {
    showNode(target, { parentId: source });
    focusNode(target);
    showChildren(target);
    hideNiblings(source);
    addDecisionToPath(source, target);
  };

  const retractDecision = (target: string) => {
    hideDescendants(target);
    removeDecisionFromPath(target);
  };

  return {
    tree,
    edges: dagEdges,
    nodes: dagNodes,
    onEdgesChange,
    onNodesChange,
    makeDecision,
    retractDecision,
  } as const;
};
