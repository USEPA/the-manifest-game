import { Edge, Node } from 'reactflow';
import { getDescendantIds, hideDescendantNodes, hideTargetEdges } from 'store/treeUtils';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

/**
 * data needed by all TreeNodes that contains the nodes expanded state, the node's children, and the node's text
 */
interface TreeNodeData {
  label: string;
  children: string[];
  expanded?: boolean;
}

/**
 * data needed by the BooleanTreeNode to render decisions
 */
interface BooleanTreeNodeData extends TreeNodeData {
  yesId: string;
  noId: string;
}

/**
 * A vertex in our decision tree. it is position (x/Y coordinate) unaware
 */
export interface TreeNode extends Omit<Node, 'position'> {
  data: TreeNodeData | BooleanTreeNodeData;
}

/**
 * A decision tree is a map of all node IDs to TreeNodes
 *
 * There may be some performance optimizations to be made here by using a Map instead of a Record
 */
export type DecisionTree = Record<string, TreeNode>;

/**
 * A wrapper for the ReactFlow Node (to make things easier to read and avoid the IDE trying to use the Node.js runtime)
 */
export interface DagNode extends Node {}

/**
 * State and the actions that can be performed on it
 *
 * Note: we keep the decision tree (our internal representation) and the nodes/edges (ReactFlow's representation) separate
 * currently, we rely on react effects to keep the Tree and the Nodes/Edges in sync - ToDo: consider moving this logic into the store
 *
 * see react-flow docs https://reactflow.dev/learn/advanced-use/state-management
 */
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
      /** set the nodes, does not affect the edges and tree */
      setNodes: (nodes: Node[]) => {
        set({
          nodes: nodes,
        });
      },
      /** set the edges, does not affect the nodes and tree */
      setEdges: (edges: Edge[]) => {
        set({
          edges: edges,
        });
      },
      /** set the decision tree, does not affect the nodes and edges*/
      setTree: (tree: DecisionTree) => {
        set({
          tree: tree,
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
        const { newTree } = hideDescendantNodes(oldTree, node);
        set({
          tree: newTree,
        });
      },
    }),
    { name: 'decisionTree', anonymousActionType: 'unknown' }
  )
);

export default treeStore;
