import { DecisionTree } from 'store/DecisionSlice/decisionSlice';

/** Accepts a DecisionTree and node ID and returns an array of children IDs of all descendant nodes in the DAG */
export const getDescendantIds = (tree: DecisionTree, id: string): string[] => {
  let childrenIds: string[] = [];

  if (tree[id]?.data.children) {
    tree[id].data.children?.forEach((child) => {
      childrenIds.push(child);
      childrenIds = childrenIds.concat(getDescendantIds(tree, child));
    });
  }

  return childrenIds;
};
/** Accepts a DecisionTree and node ID and returns an array of sibling IDs */
export const getSiblingIds = (tree: DecisionTree, id: string): string[] => {
  const node = tree[id];
  if (node.position.rank === undefined) throw new Error('Node must have a rank to find siblings');
  const rank = node.position.rank;
  return Object.values(tree)
    .filter((n) => n.position.rank === rank && n.id !== id)
    .map((n) => n.id);
};
/** set hidden to false */
export const setNodeVisible = (tree: DecisionTree, nodeIds: string[]) => {
  nodeIds.forEach((id) => (tree[id].hidden = false));
  return tree;
};

export const setNodesHidden = (tree: DecisionTree, nodeIds: string[]) => {
  nodeIds.forEach((id) => (tree[id].hidden = true));
  return tree;
};

export const setExpanded = (tree: DecisionTree, nodeIds: string[]) => {
  nodeIds.forEach((id) => (tree[id].data.expanded = true));
  return tree;
};

export const setCollapsed = (tree: DecisionTree, nodeIds: string[]) => {
  nodeIds.forEach((id) => (tree[id].data.expanded = false));
  return tree;
};
