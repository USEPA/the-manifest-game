/** internal functions used by the decision tree store.
 * Every function here should be a pure function (accepts everything it needs as arguments and returns a new value)
 * this will help maintain testability and make it easier to refactor later
 *  Do not export outside this module
 * */
import { Edge, MarkerType } from 'reactflow';
import { DecisionTree, TreeNode } from 'store/treeStore';

export const setTreeAttributesToHide = (tree: DecisionTree, node: TreeNode) => {
  const childrenIds = getDescendantIds(tree, node.id);
  const newTree = { ...tree };
  newTree[node.id] = { ...node, data: { ...node.data, expanded: false } };
  childrenIds.forEach((id: string) => {
    newTree[id].hidden = true;
  });
  return { newTree, childrenIds };
};
/** creates the edges between two nodes with defaults applied */
export const createTreeEdge = (source: string, target: string): Edge => {
  return {
    id: `${source}-${target}`,
    hidden: false,
    source,
    target,
    type: 'smoothstep',
    markerEnd: { type: MarkerType.ArrowClosed },
  };
};
/** Hide edges that include the given node IDs as their target - returns a new array of edges */
export const hideTargetEdges = ({
  edges,
  targetNodeIds,
  hidden = true,
}: {
  edges: Array<Edge>;
  targetNodeIds: string[];
  hidden?: boolean;
}): Array<Edge> => {
  return edges.map((edge) => {
    if (targetNodeIds.includes(edge.target)) {
      return { ...edge, hidden };
    }
    return edge;
  });
};
/** loop through DecisionTree and create an array of Reactflow edges */
// ToDo - export this as a function of our store
export const buildTreeEdges = (tree: DecisionTree): Array<Edge> => {
  const edges: Array<Edge> = [];

  Object.keys(tree).forEach((key) => {
    const node = tree[key];
    if (node.data.children) {
      node.data.children.forEach((childId: string) => {
        edges.push(createTreeEdge(node.id, childId));
      });
    }
  });

  return edges;
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
