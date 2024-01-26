import { Edge, MarkerType, Node } from 'reactflow';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface TreeNodeData {
  label: string;
  children: string[];
  expanded?: boolean;
}

interface BooleanTreeNodeData extends TreeNodeData {
  yesId: string;
  noId: string;
}

export interface TreeNode extends Omit<Node, 'position'> {
  data: TreeNodeData | BooleanTreeNodeData;
}

export type DecisionTree = Record<string, TreeNode>;

export interface DecisionTreeNode extends Node {}

export type TreeStore = {
  tree: DecisionTree;
  nodes: Node[];
  edges: Edge[];
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  setTree: (tree: DecisionTree) => void;
  hideNode: (nodeId: string) => void;
  showNode: (nodeId: string) => void;
  showTargetEdges: (nodeId: string) => void;
  hideTargetEdges: (nodeId: string) => void;
  hideDescendantEdges: (nodeId: string) => void;
  hideDescendantNodes: (nodeId: string) => void;
};

const treeStore = create<TreeStore>()(
  devtools(
    (set, get) => ({
      tree: {},
      nodes: [],
      edges: [],
      setNodes: (nodes: Node[]) => {
        set({
          nodes: nodes,
        });
      },
      setEdges: (edges: Edge[]) => {
        set({
          edges: edges,
        });
      },
      setTree: (tree: DecisionTree) => {
        set({
          tree: tree,
        });
      },
      /** hide all edges below the given node ID in the DAG */
      hideDescendantEdges: (nodeId: string) => {
        const childrenIds = getDescendantIds(get().tree, nodeId);
        const updatedEdges = hideTargetEdges({
          edges: get().edges,
          targetNodeIds: childrenIds,
        });
        set({
          edges: updatedEdges,
        });
      },
      /** hide all nodes below the given node ID in the DAG */
      hideDescendantNodes: (nodeId: string) => {
        const node = get().tree[nodeId];
        const oldTree = get().tree;
        const { newTree } = setTreeAttributesToHide(oldTree, node);
        set({
          tree: newTree,
        });
      },
      /** hides the TreeNode by id and all nodes and edges recursively */
      hideNode: (nodeId: string) => {
        const childrenIds = getDescendantIds(get().tree, nodeId);
        const tree = get().tree;
        [nodeId, ...childrenIds].forEach((id) => (tree[id].hidden = true));
        set({
          tree: tree,
        });
      },
      showNode: (nodeId: string) => {
        const newTree = { ...get().tree };
        newTree[nodeId].hidden = false;
        set({
          tree: newTree,
        });
      },
      /** show the edges that connect to (target) the given node ID */
      showTargetEdges: (nodeId: string) => {
        const edges = get().edges.map((edge) => {
          if (edge.target === nodeId) {
            return { ...edge, hidden: false };
          }
          return edge;
        });
        set({
          edges: edges,
        });
      },
      /** hide the edges that connect to (target) the given node ID */
      hideTargetEdges: (nodeId: string) => {
        const edges = get().edges.map((edge) => {
          if (edge.target === nodeId) {
            return { ...edge, hidden: true };
          }
          return edge;
        });
        set({
          edges: edges,
        });
      },
    }),
    { name: 'decisionTree', anonymousActionType: 'unknown' }
  )
);

const setTreeAttributesToHide = (tree: DecisionTree, node: TreeNode) => {
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

export default treeStore;
