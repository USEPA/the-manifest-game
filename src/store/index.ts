import { createDagEdgeSlice, DagEdgeSlice } from 'store/DagEdgeSlice/dagEdgeSlice';
import { createDagNodeSlice, DagNodeSlice } from 'store/DagNodeSlice/dagNodeSlice';
import { createDecisionSlice, DecisionSlice } from 'store/DecisionSlice/decisionSlice';
import { createTreeSlice, TreeSlice } from 'store/TreeSlice/treeSlice';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type {
  TreeNode,
  DagNode,
  PositionUnawareDecisionTree,
  ShowDagNodeOptions,
} from 'store/DagNodeSlice/dagNodeSlice';

export type { TreeDirection, DecisionTree } from 'store/DecisionSlice/decisionSlice';

const useTreeStore = create<DagNodeSlice & DecisionSlice & DagEdgeSlice & TreeSlice>()(
  devtools(
    (...args) => ({
      ...createDagNodeSlice(...args),
      ...createDagEdgeSlice(...args),
      ...createDecisionSlice(...args),
      ...createTreeSlice(...args),
    }),
    { name: 'The Manifest Game' }
  )
);

export default useTreeStore;
