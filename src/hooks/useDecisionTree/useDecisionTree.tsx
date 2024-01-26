import { useTreeEdges } from 'hooks/useTreeEdges/useTreeEdges';
import { useTreeNodes } from 'hooks/useTreeNodes/useTreeNodes';
import { Node, NodeMouseHandler } from 'reactflow';
import { DecisionTree, hideTargetEdges } from 'store';
import { getRecursiveChildrenIds } from 'store/treeStore';

const closeChildren = (tree: DecisionTree, node: Node) => {
  const childrenIds = getRecursiveChildrenIds(tree, node.id);
  const newTree = { ...tree };
  newTree[node.id] = { ...node, data: { ...node.data, expanded: false } };
  childrenIds.forEach((id: string) => {
    newTree[id].hidden = true;
  });
  return { newTree, childrenIds };
};

const openDirectChildren = (tree: DecisionTree, node: Node) => {
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
 * returns an array of nodes to be used with the React Flow library and getter/setter functions
 * @param initialTree
 */
export const useDecisionTree = (initialTree: DecisionTree) => {
  const { nodes, tree, setTree, onNodesChange, onConnect } = useTreeNodes(initialTree);
  const { edges, setEdges, onEdgesChange } = useTreeEdges(initialTree);

  const onClick: NodeMouseHandler = (event, node) => {
    const { data } = node;
    switch (node.type) {
      case 'BoolNode':
        return null; // offload click handling to the BoolNode component
      default:
        if (!data.expanded) {
          const { newTree, childrenIds } = openDirectChildren(tree, node);
          setTree(newTree);
          setEdges(
            hideTargetEdges({
              edges,
              targetNodeIds: childrenIds,
              hidden: false,
            })
          );
        } else {
          const { newTree, childrenIds } = closeChildren(tree, node);
          setTree(newTree);
          setEdges(
            hideTargetEdges({
              edges,
              targetNodeIds: childrenIds,
              hidden: true,
            })
          );
        }
    }
  };

  return {
    nodes,
    edges,
    onClick,
    onConnect,
    onNodesChange,
    onEdgesChange,
  } as const;
};
