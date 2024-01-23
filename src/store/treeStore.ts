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
import { ManifestTree } from 'services/tree/treeService';
import type {} from '@redux-devtools/extension';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type TreeStore = {
  tree: ManifestTree;
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
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
      showNode: (nodeId: string): void => {
        const node = get().tree[nodeId];
        if (node) {
          console.log(node);
        }
      },
    }),
    { name: 'decisionTree', anonymousActionType: 'unknown' }
  )
);

export default treeStore;
