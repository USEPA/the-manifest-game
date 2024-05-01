import { DecisionTree } from 'store/TreeSlice/treeSlice';

/** set hidden to false */
export const setNodeVisible = (tree: DecisionTree, nodeIds: string[]) => {
  nodeIds.forEach((id) => (tree[id].hidden = false));
  return tree;
};

/** set hidden to true */
export const setNodesHidden = (tree: DecisionTree, nodeIds: string[]) => {
  nodeIds.forEach((id) => (tree[id].hidden = true));
  return tree;
};

export const getAncestorIds = (tree: DecisionTree, nodeId: string): string[] => {
  const ancestors: string[] = [];
  Object.values(tree).forEach((node) => {
    if (node.data.children.includes(nodeId)) {
      ancestors.push(node.id);
      ancestors.push(...getAncestorIds(tree, node.id));
    }
  });
  return ancestors;
};
