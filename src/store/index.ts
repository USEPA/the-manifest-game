import { createTreeSlice, TreeSlice } from 'store/treeSlice';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type { DecisionTree, TreeNode, TreeSlice, DagNode } from 'store/treeSlice';
export { buildTreeEdges } from 'store/treeUtils';

export const useStore = create<TreeSlice>()(
  devtools(
    (...args) => ({
      ...createTreeSlice(...args),
    }),
    { name: 'The Manifest Game', store: 'decisionTree' }
  )
);

export default useStore;
