import { DagEdgeSlice } from '@/store/DagEdgeSlice/dagEdgeSlice';
import {
  DagNodeSlice,
  PositionUnawareDecisionTree,
  ShowDagNodeOptions,
} from '@/store/DagNodeSlice/dagNodeSlice';
import { getDescendantIds, getSiblingIds } from '@/store/DecisionTreeStore/decisionTreeStoreUtils';
import { TreeDirection, TreeSlice } from '@/store/TreeSlice/treeSlice';
import { buildAncestorDecisions } from '@/store/TreeSlice/treeSliceUtils';
import { StateCreator } from 'zustand';

/** The state and actions of the Combined slice*/
export interface DecisionTreeStore {
  setDirection: (direction: TreeDirection) => void;
  setTree: (tree: PositionUnawareDecisionTree) => void;
  showNode: (nodeId: string, options?: ShowDagNodeOptions) => void;
  showChildren: (nodeId: string) => void;
  hideDescendants: (nodeId: string) => void;
  hideNiblings: (nodeId: string) => void;
  addDecisionToPath: (source: string, target: string) => void;
  removeDecisionFromPath: (nodeId: string) => void;
  getParentId: (nodeId: string) => string | undefined;
}

/** The state of the decision tree, implemented as a shared slice that builds on concrete slices
 * and exposes an interface of actions that users can take on the decision tree
 * */
export const createDecisionTreeStore: StateCreator<
  TreeSlice & DagNodeSlice & DagEdgeSlice,
  [],
  [],
  DecisionTreeStore
> = (_set, get) => ({
  setDirection: (direction: TreeDirection) => {
    get().setTreeDirection(direction);
    get().positionDagNodes(get().tree);
  },
  setTree: (tree: PositionUnawareDecisionTree) => {
    get().setDecisionTree(tree);
  },
  showNode: (nodeId: string, options?: ShowDagNodeOptions) => {
    get().setVertexVisible(nodeId);
    const tree = get().tree;
    get().createDagNode(nodeId, tree);
    get().createEdge(options?.parentId, nodeId);
  },
  showChildren: (nodeId: string) => {
    const childrenIds = get().tree[nodeId].data.children;
    const tree = get().tree;
    childrenIds?.forEach((id) => {
      get().setVertexVisible(id);
      get().createDagNode(id, tree);
      get().createEdge(nodeId, id);
    });
  },
  hideDescendants: (nodeId: string) => {
    const childrenIds = getDescendantIds(get().tree, nodeId);
    get().removeDagNodes([...childrenIds]);
    get().setChildrenEdgesUndecided(nodeId);
  },
  hideNiblings: (nodeId: string) => {
    const dagTree = get().tree;
    const siblingIds = getSiblingIds(dagTree, nodeId);
    siblingIds.map((id) => get().setChildrenEdgesUndecided(id));
    const siblingDescendantIds = siblingIds.flatMap((id) => getDescendantIds(dagTree, id));
    get().removeDagNodes([...siblingDescendantIds]);
  },
  addDecisionToPath: (source: string, target: string) => {
    get().setChildrenEdgesUndecided(source);
    get().setEdgeDecided(source, target);
    get().removePathDecision(source);
    const ancestorIds = get().getAncestorDecisions(target);
    const newDecisions = buildAncestorDecisions(get().tree, ancestorIds);
    get().setPath([...newDecisions, { nodeId: source, selected: target }]);
  },
  removeDecisionFromPath: (nodeId: string) => {
    const decisionIdsToRemove = getDescendantIds(get().tree, nodeId);
    decisionIdsToRemove.push(nodeId);
    const pathWithoutDescendants = get()
      .getPath()
      .filter((decision) => !decisionIdsToRemove.includes(decision.nodeId));
    get().setPath(pathWithoutDescendants);
  },
  getParentId: (nodeId: string) => {
    return get().getParentVertexId(nodeId);
  },
});
