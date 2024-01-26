import { Edge, Node } from 'reactflow';
import { getDescendantIds, hideTargetEdges, setTreeAttributesToHide } from 'store/treeUtils';
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

export default treeStore;
