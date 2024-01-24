import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
} from 'reactflow';
import { ManifestNode } from 'services/tree/treeService';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface TreeNodeData {
  label: string;
  children?: string[];
  expanded?: boolean;
  yesId?: string;
  noId?: string;
}

export interface TreeNode extends Omit<Node, 'position'> {
  children?: string[];
  yesId?: string;
  noId?: string;
  data: TreeNodeData;
}

export type DecisionTree = Record<string, TreeNode>;

export type TreeStore = {
  tree: DecisionTree;
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: ManifestNode[]) => void;
  setEdges: (edges: Edge[]) => void;
  setTree: (tree: DecisionTree) => void;
  updateNode: (node: Partial<TreeNode>) => void;
};

const treeStore = create<TreeStore>()(
  devtools(
    (set, get) => ({
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
      setTree: (tree: DecisionTree) => {
        set({
          tree: tree,
        });
      },
      /** updates the TreeNode by id */
      updateNode: (node: Partial<TreeNode>) => {
        if (!node.id) {
          throw new Error('Cannot update node without id');
        }
        set({
          tree: {
            ...get().tree,
            [node.id]: {
              ...get().tree[node.id],
              ...node,
            },
          },
        });
      },
    }),
    { name: 'decisionTree', anonymousActionType: 'unknown' }
  )
);

export default treeStore;
