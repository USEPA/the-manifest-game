import { useTreeEdges } from 'hooks/useTreeEdges/useTreeEdges';
import { useTreeNodes } from 'hooks/useTreeNodes/useTreeNodes';
import { Node, NodeMouseHandler } from 'reactflow';
import { DecisionTree, hideTargetEdges } from 'store';
import { getDescendantIds } from 'store/treeStore';

const hideChildren = (tree: DecisionTree, node: Node) => {
  const childrenIds = getDescendantIds(tree, node.id);
  const newTree = { ...tree };
  newTree[node.id] = { ...node, data: { ...node.data, expanded: false } };
  childrenIds.forEach((id: string) => {
    newTree[id].hidden = true;
  });
  return { newTree, childrenIds };
};

const showChildren = (tree: DecisionTree, node: Node) => {
  const childrenIds = node.data.children;
  const newTree = { ...tree };
  newTree[node.id] = { ...node, data: { ...node.data, expanded: true } };
  childrenIds.forEach((id: string) => {
    newTree[id].hidden = false;
  });
  return { newTree, childrenIds };
};

/**
 * useManifestTree
 *
 * logic and interface for managing the interactive e-Manifest decision tree
 * returns an array of nodes to be used with the ReactFlow library and getter/setter functions
 * @param initialTree
 */
export const useDecisionTree = (initialTree: DecisionTree) => {
  const { nodes, tree, setTree, hideDescendants } = useTreeNodes(initialTree);
  const { edges, setEdges } = useTreeEdges(initialTree);

  const onClick: NodeMouseHandler = (event, node) => {
    const { data } = node;
    switch (node.type) {
      case 'BoolNode':
        return null; // offload click handling to the BoolNode component
      default:
        if (!data.expanded) {
          const { newTree, childrenIds } = showChildren(tree, node);
          setTree(newTree);
          setEdges(
            hideTargetEdges({
              edges,
              targetNodeIds: childrenIds,
              hidden: false,
            })
          );
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
