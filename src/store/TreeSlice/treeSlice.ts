import { DagEdgeSlice } from 'store/DagEdgeSlice/dagEdgeSlice';
import {
  DagNodeSlice,
  PositionUnawareDecisionTree,
  ShowDagNodeOptions,
} from 'store/DagNodeSlice/dagNodeSlice';
import { DecisionSlice, TreeDirection } from 'store/DecisionSlice/decisionSlice';
import { getDescendantIds, getSiblingIds } from 'store/DecisionSlice/decisionUtils';
import { StateCreator } from 'zustand';

/** The state and actions of the Combined slice*/
export interface TreeSlice {
  setDirection: (direction: TreeDirection) => void;
  setTree: (tree: PositionUnawareDecisionTree) => void;
  showNode: (nodeId: string, options?: ShowDagNodeOptions) => void;
  hideNode: (nodeId: string) => void;
  showChildren: (nodeId: string) => void;
  hideDescendants: (nodeId: string) => void;
  removeNiblings: (nodeId: string) => void;
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
    get().setDagNodePositions(get().tree);
  },
  setTree: (tree: PositionUnawareDecisionTree) => {
    get().setDecisionTree(tree);
  },
  showNode: (nodeId: string, options?: ShowDagNodeOptions) => {
    get().setDecisionVisible(nodeId);
    const tree = get().tree;
    get().createDagNode(nodeId, tree);
    get().createEdge(options?.parentId, nodeId);
  },
  hideNode: (nodeId: string) => {
    get().setDecisionHidden(nodeId);
    get().removeEdgesByTarget([nodeId]);
    get().removeDagNodes([nodeId]);
  },
  showChildren: (nodeId: string) => {
    get().setDecisionExpanded(nodeId);
    get().createChildrenNodes(nodeId, get().tree);
  },
  hideDescendants: (nodeId: string) => {
    const childrenIds = getDescendantIds(get().tree, nodeId);
    get().setDecisionCollapsed(nodeId, childrenIds);
    get().removeDagNodes([...childrenIds]);
  },
  removeNiblings: (nodeId: string) => {
    const dagTree = get().tree;
    const siblingIds = getSiblingIds(dagTree, nodeId);
    const siblingDescendantIds = siblingIds.flatMap((id) => getDescendantIds(dagTree, id));
    get().setDecisionCollapsed(nodeId, siblingDescendantIds);
    get().removeDagNodes([...siblingDescendantIds]);
  },
});
