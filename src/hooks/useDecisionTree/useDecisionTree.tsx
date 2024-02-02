import { useDAG } from 'hooks/useDAG/useDAG';
import { NodeMouseHandler } from 'reactflow';
import useStore, { DecisionTree } from 'store';

/**
 * useDecisionTree
 *
 * Returns an array of nodes & edges to be used with the ReactFlow library
 * @param initialTree
 */
export const useDecisionTree = (initialTree: DecisionTree) => {
  const { hideDescendants, showChildren } = useDAG(initialTree);
  const { dagNodes, dagEdges } = useStore((state) => state);

  /** handle node click events */
  const onClick: NodeMouseHandler = (_event, node) => {
    switch (node.type) {
      case 'BoolNode':
        return null; // offload click handling to the BoolNode component
      default:
        if (!node.data.expanded) {
          showChildren(node.id);
        } else {
          hideDescendants(node.id);
        }
    }
  };

  return {
    nodes: dagNodes,
    edges: dagEdges,
    onClick,
  } as const;
};
