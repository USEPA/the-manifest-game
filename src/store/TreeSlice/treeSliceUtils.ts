import { DecisionPath, DecisionTree } from 'store/TreeSlice/treeSlice';

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
    if (node.data.children.includes(nodeId)) {
      ancestors.push(node.id);
      ancestors.push(...getAncestorIds(tree, node.id));
    }
  });
  return ancestors;
};

/** convert ancestor ids to ancestor decisions */
export const buildAncestorDecisions = (tree: DecisionTree, ancestorIds: string[]): DecisionPath => {
  // @ts-expect-error - ToDo fix this typescript error to check for situations where the selected answer is not found
  return ancestorIds.map((id) => {
    const node = tree[id];
    // ToDo break this into smaller function
    const selectedAnswer = node.data.children.find((childId) =>
      ancestorIds.filter((choice) => {
        if (childId === choice) return choice;
      })
    );
    return { nodeId: node.id, selected: selectedAnswer };
  });
};
