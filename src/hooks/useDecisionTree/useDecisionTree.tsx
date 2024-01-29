import { getLayoutElements } from 'components/Tree/layout';
import { useTreeEdges } from 'hooks/useTreeEdges/useTreeEdges';
import { useTreeNodes } from 'hooks/useTreeNodes/useTreeNodes';
import { useEffect, useMemo } from 'react';
import { NodeMouseHandler } from 'reactflow';
import { DagNode, DecisionTree, useTreeStore } from 'store';

const treeToNodes = (tree: DecisionTree): Array<DagNode> => {
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

/**
 * useDecisionTree
 *
 * Returns an array of nodes & edges to be used with the ReactFlow library
 * @param initialTree
 */
export const useDecisionTree = (initialTree: DecisionTree) => {
  const { hideDescendants, showChildren, tree } = useTreeNodes(initialTree);
  const { edges } = useTreeEdges(initialTree);
  const { nodes, setNodes } = useTreeStore((state) => state);

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

  const { nodes: positionedNodes, edges: positionedEdges } = useMemo(() => {
    if (!nodes || !edges || nodes.length === 0 || edges.length === 0) {
      return { nodes: [], edges: [] };
    }
    return getLayoutElements(nodes, edges);
  }, [nodes, edges]);

  useEffect(() => {
    setNodes(treeToNodes(tree));
  }, [tree, setNodes]);

  return {
    nodes: positionedNodes,
    edges: positionedEdges,
    onClick,
  } as const;
};
