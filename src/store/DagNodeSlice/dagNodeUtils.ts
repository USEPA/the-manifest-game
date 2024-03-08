/** internal functions used by the decision tree store.
 * Every function here should be a pure function (accepts everything it needs as arguments and returns a new value)
 * this will help maintain testability and make it easier to refactor later
 *  Do not export outside this module
 * */
import { DagNode, DecisionTree, TreeNode } from 'store/DagNodeSlice/dagNodeSlice';

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
    dragHandle: '.node-drag-handle',
    draggable: true,
    // @ts-expect-error - we are converting TreeNode to position aware once loaded into the store
    position: config.position,
    ...config,
  };
};

/** Apply the positions from the tree to our existing nodes */
export const applyPositionToNodes = (tree: DecisionTree, nodes: DagNode[]) => {
  return nodes.map((node) => {
    const newNode = { ...node };
    newNode.position = {
      x: tree[node.id].position.x,
      y: tree[node.id].position.y,
    };
    return newNode;
  });
};

/** Filter nodes by id */
export const filterNodesById = (nodes: DagNode[], ids: string[]): DagNode[] => {
  return nodes.filter((node) => !ids.includes(node.id));
};
