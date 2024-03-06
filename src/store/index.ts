import { createDagSlice, DagSlice, ShowDagNodeOptions } from 'store/DagSlice/dagSlice';
import {
  createDecisionSlice,
  DecisionSlice,
  PositionUnawareDecisionTree,
  TreeDirection,
} from 'store/DecisionSlice/decisionSlice';
import { getDescendantIds, getSiblingIds } from 'store/DecisionSlice/decisionUtils';
import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

export type {
  DecisionTree,
  TreeNode,
  DagNode,
  PositionUnawareDecisionTree,
} from 'store/DagSlice/dagSlice';

interface TreeSlice {
  setDirection: (direction: TreeDirection) => void;
  setTree: (tree: PositionUnawareDecisionTree) => void;
  showNode: (nodeId: string, options?: ShowDagNodeOptions) => void;
  hideNode: (nodeId: string) => void;
  showChildren: (nodeId: string) => void;
  hideDescendants: (nodeId: string) => void;
  removeNiblings: (nodeId: string) => void;
}

const createSharedTreeSlice: StateCreator<DecisionSlice & DagSlice, [], [], TreeSlice> = (
  _set,
  get
) => ({
  setDirection: (direction: TreeDirection) => {
    get().setTreeDirection(direction);
    get().setNodePositions(get().tree);
  },
  setTree: (tree: PositionUnawareDecisionTree) => {
    get().setDecisionTree(tree);
  },
  showNode: (nodeId: string, options?: ShowDagNodeOptions) => {
    get().setDecisionVisible(nodeId);
    const tree = get().tree;
    get().createNode(nodeId, tree, options);
  },
  hideNode: (nodeId: string) => {
    get().setDecisionHidden(nodeId);
    get().removeNodes([nodeId]);
  },
  showChildren: (nodeId: string) => {
    get().setDecisionExpanded(nodeId);
    get().createChildrenNodes(nodeId, get().tree);
  },
  hideDescendants: (nodeId: string) => {
    const childrenIds = getDescendantIds(get().tree, nodeId);
    get().setDecisionCollapsed(nodeId, childrenIds);
    get().removeNodes([...childrenIds]);
  },
  removeNiblings: (nodeId: string) => {
    const dagTree = get().tree;
    const siblingIds = getSiblingIds(dagTree, nodeId);
    const siblingDescendantIds = siblingIds.flatMap((id) => getDescendantIds(dagTree, id));
    get().setDecisionCollapsed(nodeId, siblingDescendantIds);
    get().removeNodes([...siblingDescendantIds]);
  },
});

export const useStore = create<DagSlice & DecisionSlice & TreeSlice>()(
  devtools(
    (...args) => ({
      ...createDagSlice(...args),
      ...createDecisionSlice(...args),
      ...createSharedTreeSlice(...args),
    }),
    { name: 'The Manifest Game' }
  )
);

export default useStore;
