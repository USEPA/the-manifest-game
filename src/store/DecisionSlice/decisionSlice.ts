import { Node } from 'reactflow';
import {
  setCollapsed,
  setExpanded,
  setNodesHidden,
  setNodeVisible,
} from 'store/DecisionSlice/decisionUtils';
import { layoutTree } from 'store/DecisionSlice/layout';
import { StateCreator } from 'zustand';

export type DecisionStatus = 'unselect' | 'chosen' | 'focused' | undefined;

/**
 * Data needed by all TreeNodes that contains the nodes expanded state,
 * the node's children, and the node's text
 */
export interface NodeData {
  label: string;
  children: string[];
  expanded?: boolean;
  status?: DecisionStatus;
  help?: boolean;
}

/** data needed by the BooleanTreeNode to render decisions*/
export interface BooleanNodeData extends NodeData {
  yesId: string;
  noId: string;
}

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

interface Decision {
  nodeId: string;
  selected: string | boolean;
}

type DecisionPath = Array<Decision>;

interface DecisionSliceState {
  tree: DecisionTree;
  direction: TreeDirection;
  path: DecisionPath;
}

interface DecisionSliceActions {
  /** build and Set the decision tree from a config. It acts as the database we build nodes from*/
  setDecisionTree: (tree: PositionUnawareDecisionTree) => void;
  /** Set the layout direction */
  setTreeDirection: (direction: TreeDirection) => void;
  /** Set vertex as visible */
  showDecision: (nodeId: string) => void;
  /** Set decision as hidden */
  hideDecision: (nodeId: string) => void;
  /** set the node as expended */
  expandDecision: (nodeId: string) => void;
  /** Set decision as collapsed */
  collapseDecision: (nodeId: string, children: string[]) => void;
  /** set node as chosen */
  setStatus: (nodeId: string[], status: DecisionStatus) => void;
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
  path: [],
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
  showDecision: (nodeId: string) => {
    const tree = setNodeVisible(get().tree, [nodeId]);
    set(
      {
        tree,
      },
      false,
      'showVertex'
    );
  },
  hideDecision: (nodeId: string) => {
    const tree = setNodesHidden(get().tree, [nodeId]);
    set(
      {
        tree,
      },
      false,
      'hideDecision'
    );
  },
  expandDecision: (nodeId: string) => {
    const tree = setExpanded(get().tree, [nodeId]);
    set(
      {
        tree,
      },
      false,
      'expandDecision'
    );
  },
  collapseDecision: (nodeId: string, children: string[]) => {
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
  setStatus: (nodeIds: string[], status: DecisionStatus) => {
    const tree = get().tree;
    nodeIds.forEach((nodeId) => {
      tree[nodeId].data.status = status ?? undefined;
    });
    set(
      {
        tree,
      },
      false,
      'chooseDecision'
    );
  },
});
