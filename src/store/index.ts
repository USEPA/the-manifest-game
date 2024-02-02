import { createDagSlice, DagSlice } from 'store/dagSlice';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type { DecisionTree, TreeNode, DagNode } from './dagSlice';
export { buildTreeEdges } from 'store/treeUtils';

export const useStore = create<DagSlice>()(
  devtools(
    (...args) => ({
      ...createDagSlice(...args),
    }),
    { name: 'The Manifest Game', store: 'decisionTree' }
  )
);

export default useStore;
