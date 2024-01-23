import {
  Edge,
  Node,
  OnEdgesChange,
  OnNodesChange,
  OnConnect,
  applyNodeChanges,
  NodeChange,
  addEdge,
  Connection,
  applyEdgeChanges,
  EdgeChange,
} from 'reactflow';
import { ManifestNode, ManifestTree } from 'services/tree/treeService';
import type {} from '@redux-devtools/extension';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface TreeNode extends Omit<Node, 'position'> {
  children?: string[];
  yesId?: string;
  noId?: string;
}

export type DecisionTree = Record<string, TreeNode>;

export type TreeStore = {
  decisionTree: DecisionTree;
  tree: ManifestTree;
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: ManifestNode[]) => void;
  setEdges: (edges: Edge[]) => void;
  setTree: (tree: ManifestTree) => void;
  setDecisionTree: (tree: DecisionTree) => void;
};

const treeStore = create<TreeStore>()(
  devtools(
    (set, get) => ({
      decisionTree: {},
      tree: {},
      nodes: [],
      edges: [],
      onNodesChange: (changes: NodeChange[]) => {
        set({
          nodes: applyNodeChanges(changes, get().nodes),
        });
      },
      onEdgesChange: (changes: EdgeChange[]) => {
        set({
          edges: applyEdgeChanges(changes, get().edges),
        });
      },
      onConnect: (connection: Connection) => {
        set({
          edges: addEdge(connection, get().edges),
        });
      },
      setNodes: (nodes: ManifestNode[]) => {
        set({
          // @ts-expect-error - there's a difference between ManifestNode and Node
          nodes: nodes,
        });
      },
      setEdges: (edges: Edge[]) => {
        set({
          edges: edges,
        });
      },
      setTree: (tree: ManifestTree) => {
        set({
          tree: tree,
        });
      },
      setDecisionTree: (tree: DecisionTree) => {
        set({
          decisionTree: tree,
        });
      },
    }),
    { name: 'decisionTree', anonymousActionType: 'unknown' }
  )
);

export default treeStore;
export { treeStore as useTreeStore };
