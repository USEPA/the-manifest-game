import { DagEdgeSlice } from 'store/DagEdgeSlice/dagEdgeSlice';
import {
  DagNodeSlice,
  PositionUnawareDecisionTree,
  ShowDagNodeOptions,
} from 'store/DagNodeSlice/dagNodeSlice';
import { DecisionSlice, TreeDirection } from 'store/DecisionSlice/decisionSlice';
import { getDescendantIds, getSiblingIds } from 'store/TreeSlice/treeSliceUtils';
import { StateCreator } from 'zustand';

/** The state and actions of the Combined slice*/
export interface TreeSlice {
  setDirection: (direction: TreeDirection) => void;
  setTree: (tree: PositionUnawareDecisionTree) => void;
  showNode: (nodeId: string, options?: ShowDagNodeOptions) => void;
  showChildren: (nodeId: string) => void;
  hideDescendants: (nodeId: string) => void;
  hideNiblings: (nodeId: string) => void;
  setDecisionMade: (nodeId: string) => void;
  setDecisionFocused: (nodeId: string) => void;
  addDecisionToPath: (source: string, target: string) => void;
}

/** The state of the tree, implemented as a shared slice that builds on concrete slices
 * and exposes an interface of actions that can take on the decision tree
 * */
export const createTreeSlice: StateCreator<
  DecisionSlice & DagNodeSlice & DagEdgeSlice,
  [],
  [],
  TreeSlice
> = (_set, get) => ({
  setDirection: (direction: TreeDirection) => {
    get().setTreeDirection(direction);
    get().positionDagNodes(get().tree);
  },
  setTree: (tree: PositionUnawareDecisionTree) => {
    get().setDecisionTree(tree);
  },
  showNode: (nodeId: string, options?: ShowDagNodeOptions) => {
    get().showDecision(nodeId);
    const tree = get().tree;
    get().createDagNode(nodeId, tree);
    get().createEdge(options?.parentId, nodeId);
  },
  showChildren: (nodeId: string) => {
    const childrenIds = get().tree[nodeId].data.children;
    const tree = get().tree;
    childrenIds?.forEach((id) => {
      get().showDecision(id);
      get().createDagNode(id, tree);
      get().createEdge(nodeId, id);
    });
    get().expandDecision(nodeId);
  },
  hideDescendants: (nodeId: string) => {
    const childrenIds = getDescendantIds(get().tree, nodeId);
    get().collapseDecision(nodeId, childrenIds);
    get().removeDagNodes([...childrenIds]);
  },
  hideNiblings: (nodeId: string) => {
    const dagTree = get().tree;
    const siblingIds = getSiblingIds(dagTree, nodeId);
    const siblingDescendantIds = siblingIds.flatMap((id) => getDescendantIds(dagTree, id));
    get().collapseDecision(nodeId, siblingDescendantIds);
    get().removeDagNodes([...siblingDescendantIds]);
  },
  setDecisionMade: (nodeId: string) => {
    const siblings = getSiblingIds(get().tree, nodeId);
    const siblingDescendantIds = siblings.flatMap((id) => getDescendantIds(get().tree, id));
    get().setStatus([nodeId], 'chosen');
    get().setStatus([...siblingDescendantIds, ...siblings], undefined);
  },
  setDecisionFocused: (nodeId: string) => {
    const siblings = getSiblingIds(get().tree, nodeId);
    const siblingDescendantIds = siblings.flatMap((id) => getDescendantIds(get().tree, id));
    get().setStatus([nodeId], 'focused');
    get().setStatus([...siblingDescendantIds, ...siblings], undefined);
    get().updateDagNodes(get().tree);
  },
  addDecisionToPath: (source: string, target: string) => {
    get().setChildrenEdgesUndecided(source);
    get().setEdgeDecided(source, target);
    get().removeDecisionAndChildren(source);
    get().setPath([...get().getPath(), { nodeId: source, selected: target }]);
  },
});
