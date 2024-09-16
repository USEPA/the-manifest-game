import { DecisionPath, DecisionTree } from '@/store/TreeSlice/treeSlice';

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

/** find all ancestor ids */
export const getAncestorIds = (tree: DecisionTree, nodeId: string): string[] => {
  const ancestors: string[] = [];
  Object.values(tree).forEach((node) => {
    if (!node.data.children) return;
    if (node.data.children.includes(nodeId)) {
      ancestors.push(node.id);
      ancestors.push(...getAncestorIds(tree, node.id));
    }
  });
  return ancestors;
};

/** convert ancestor ids to ancestor decisions */
export const buildAncestorDecisions = (tree: DecisionTree, ancestorIds: string[]): DecisionPath => {
  const decisions: DecisionPath = [];
  ancestorIds.map((id) => {
    const node = tree[id];
    const selectedAnswer = node.data.children.find((childId) => ancestorIds.includes(childId));
    if (selectedAnswer) {
      decisions.push({ nodeId: node.id, selected: selectedAnswer });
    }
  });
  return decisions;
};

/** find the ID of the parent node */
export const getParentId = (tree: DecisionTree, nodeId: string): string | undefined => {
  const parent = Object.values(tree).find((node) => node.data.children?.includes(nodeId));
  return parent?.id;
};
