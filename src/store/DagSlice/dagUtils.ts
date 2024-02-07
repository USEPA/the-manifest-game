/** internal functions used by the decision tree store.
 * Every function here should be a pure function (accepts everything it needs as arguments and returns a new value)
 * this will help maintain testability and make it easier to refactor later
 *  Do not export outside this module
 * */
import { Edge, MarkerType } from 'reactflow';
import { DagNode, DecisionTree, TreeNode } from './dagSlice';

/** creates the edges between two nodes with defaults applied */
export const createDagEdge = (source: string, target: string): Edge => {
  return {
    id: `${source}-${target}`,
    hidden: false,
    source,
    target,
    type: 'default',
    markerEnd: { type: MarkerType.ArrowClosed },
  };
};

/** create a new position unaware node with defaults applied */
export const createDagNode = (id: string, config: Partial<TreeNode>): DagNode => {
  const { data } = config;
  if (!data) throw new Error('data is required for a node');
  return {
    id,
    data,
    type: config.type ?? 'default',
    hidden: false,
    connectable: false,
    dragHandle: '.custom-drag-handle',
    draggable: true,
    // @ts-expect-error - we are converting TreeNode to position aware once loaded into the store
    position: config.position,
    ...config,
  };
};

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
