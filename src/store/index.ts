import { createDagSlice, DagSlice } from 'store/DagSlice/dagSlice';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type { DecisionTree, TreeNode, DagNode } from 'store/DagSlice/dagSlice';

export const useStore = create<DagSlice>()(
  devtools(
    (...args) => ({
      ...createDagSlice(...args),
    }),
    { name: 'The Manifest Game' }
  )
);

export default useStore;
