import { createDagEdgeSlice, DagEdgeSlice } from 'store/DagEdgeSlice/dagEdgeSlice';
import { createDagNodeSlice, DagNodeSlice } from 'store/DagNodeSlice/dagNodeSlice';
import { createDecisionSlice, DecisionSlice } from 'store/DecisionSlice/decisionSlice';
import {
  createDecisionTreeStore,
  DecisionTreeStore,
} from 'store/DecisionTreeStore/decisionTreeStore';
import { createHelpSlice, HelpSlice } from 'store/HelpSlice/helpSlice';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type {
  TreeNode,
  DagNode,
  PositionUnawareDecisionTree,
  ShowDagNodeOptions,
} from 'store/DagNodeSlice/dagNodeSlice';

export type { TreeDirection, DecisionTree } from 'store/DecisionSlice/decisionSlice';

const useTreeStore = create<
  DagNodeSlice & DecisionSlice & DagEdgeSlice & DecisionTreeStore & HelpSlice
>()(
  devtools(
    (...args) => ({
      ...createDagNodeSlice(...args),
      ...createDagEdgeSlice(...args),
      ...createDecisionSlice(...args),
      ...createDecisionTreeStore(...args),
      ...createHelpSlice(...args),
    }),
    { name: 'The Manifest Game' }
  )
);

export default useTreeStore;
