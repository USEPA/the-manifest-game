import { useTreeStore } from 'hooks';
import { NodeMouseHandler } from 'reactflow';
import { PositionUnawareDecisionTree } from 'store';

/**
 * Returns an array of nodes & edges to be used with the ReactFlow library
 * ToDo: consolidate useTreeStore and useDecisionTree
 * @param initialTree
 */
export const useDecisionTree = (initialTree?: PositionUnawareDecisionTree) => {
  const { hideDescendants, showChildren, edges, nodes, hideNiblings } = useTreeStore(initialTree);

  /** handle node click events ToDo: remove this and locate onClick logic in the default node*/
  const onClick: NodeMouseHandler = (_event, node) => {
    switch (node.type) {
      case 'BoolNode':
        return null; // offload click handling to the BoolNode component
      default:
        if (!node.data.expanded) {
          showChildren(node.id);
          hideNiblings(node.id);
        } else {
          hideDescendants(node.id);
        }
    }
  };

  return {
    nodes,
    edges,
    onClick,
  } as const;
};
