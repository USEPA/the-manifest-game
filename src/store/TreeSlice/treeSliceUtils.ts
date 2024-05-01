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
