import { createDagEdgeSlice, DagEdgeSlice } from '@/store/DagEdgeSlice/dagEdgeSlice';
import { createDagNodeSlice, DagNodeSlice } from '@/store/DagNodeSlice/dagNodeSlice';
import {
  createDecisionTreeStore,
  DecisionTreeStore,
} from '@/store/DecisionTreeStore/decisionTreeStore';
import { createHelpSlice, HelpSlice } from '@/store/HelpSlice/helpSlice';
import { createTreeSlice, TreeSlice } from '@/store/TreeSlice/treeSlice';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type {
  TreeNode,
  DagNode,
  PositionUnawareDecisionTree,
  ShowDagNodeOptions,
} from '@/store/DagNodeSlice/dagNodeSlice';

export type { TreeDirection, DecisionTree } from '@/store/TreeSlice/treeSlice';

const useTreeStore = create<
  DagNodeSlice & TreeSlice & DagEdgeSlice & DecisionTreeStore & HelpSlice
>()(
  devtools(
    (...args) => ({
      ...createDagNodeSlice(...args),
      ...createDagEdgeSlice(...args),
      ...createTreeSlice(...args),
      ...createDecisionTreeStore(...args),
      ...createHelpSlice(...args),
    }),
    { name: 'The Manifest Game' }
  )
);

export { useTreeStore };
