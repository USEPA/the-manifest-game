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
import { create } from 'zustand';

export type TreeStore = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
};

const treeStore = create<TreeStore>((set, get) => ({
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
}));

export default treeStore;
