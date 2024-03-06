import { BooleanNodeData, NodeData } from 'hooks/useFetchConfig/useFetchConfig';
import { Node } from 'reactflow';
import { layoutTree } from 'store/DecisionSlice/layout';
import { StateCreator } from 'zustand';

/** A vertex in our decision tree.*/
export interface TreeNode extends Omit<Node, 'position'> {
  data: NodeData | BooleanNodeData;
  position: { x: number; y: number; rank?: number };
}

/**
 * A decision tree is a map of all node IDs to TreeNodes
 * There may be some performance optimizations to be made here by using a Map instead of a Object
 */
export type DecisionTree = Record<string, TreeNode>;

export type PositionUnawareDecisionTree = Record<string, Omit<TreeNode, 'position'>>;

export type TreeDirection = 'TB' | 'LR';

interface DecisionSliceState {
  tree: DecisionTree;
  direction: TreeDirection;
}

interface DecisionSliceActions {
  /** build and Set the decision tree from a config. It acts as the database we build nodes from*/
  setDecisionTree: (tree: PositionUnawareDecisionTree) => void;
  /** Set the layout direction */
  setTreeDirection: (direction: TreeDirection) => void;
  /** Set vertex as visible */
  setDecisionVisible: (nodeId: string) => void;
  /** Set decision as hidden */
  setDecisionHidden: (nodeId: string) => void;
  /** set the node as expended */
  setDecisionExpanded: (nodeId: string) => void;
  /** Set decision as collapsed */
  setDecisionCollapsed: (nodeId: string, children: string[]) => void;
}

export interface DecisionSlice extends DecisionSliceActions, DecisionSliceState {}

export const createDecisionSlice: StateCreator<
  DecisionSlice,
  [['zustand/devtools', never]],
  [],
  DecisionSlice
> = (set, get) => ({
  direction: 'LR',
  tree: {},
  setTreeDirection: (direction: TreeDirection) => {
    const tree = layoutTree(get().tree, direction);
    set(
      {
        tree,
        direction,
      },
      false,
      'setTreeDirection'
    );
  },
  setDecisionTree: (tree: PositionUnawareDecisionTree) => {
    const positionAwareTree = layoutTree(tree);
    set(
      {
        tree: positionAwareTree,
      },
      false,
      'setNewTree'
    );
  },
  setDecisionVisible: (nodeId: string) => {
    const tree = setNodeVisible(get().tree, nodeId);
    set(
      {
        tree,
      },
      false,
      'showVertex'
    );
  },
  setDecisionHidden: (nodeId: string) => {
    const tree = setNodesHidden(get().tree, [nodeId]);
    set(
      {
        tree,
      },
      false,
      'hideDecision'
    );
  },
  setDecisionExpanded: (nodeId: string) => {
    const tree = setExpanded(get().tree, [nodeId]);
    set(
      {
        tree,
      },
      false,
      'expandDecision'
    );
  },
  setDecisionCollapsed: (nodeId: string, children: string[]) => {
    const tree = get().tree;
    const hiddenTree = setNodesHidden(tree, children);
    const collapsedTree = setCollapsed(hiddenTree, [...children, nodeId]);
    set(
      {
        tree: collapsedTree,
      },
      false,
      'collapseDecision'
    );
  },
});

const setNodeVisible = (tree: DecisionTree, nodeId: string) => {
  tree[nodeId].hidden = false;
  return tree;
};

const setNodesHidden = (tree: DecisionTree, nodeIds: string[]) => {
  nodeIds.forEach((id) => (tree[id].hidden = true));
  return tree;
};

const setExpanded = (tree: DecisionTree, nodeIds: string[]) => {
  nodeIds.forEach((id) => (tree[id].data.expanded = true));
  return tree;
};

const setCollapsed = (tree: DecisionTree, nodeIds: string[]) => {
  nodeIds.forEach((id) => (tree[id].data.expanded = false));
  return tree;
};
