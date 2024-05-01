import { Node } from 'reactflow';
import { setNodesHidden, setNodeVisible } from 'store/DecisionSlice/decisionUtils';
import { layoutTree } from 'store/DecisionSlice/layout';
import { StateCreator } from 'zustand';

export type DecisionStatus = 'unselect' | 'chosen' | 'focused' | undefined;

/** Data needed by all nodes in our tree*/
export interface NodeData {
  label: string;
  children: string[];
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

export interface Decision {
  nodeId: string;
  selected: string | boolean;
}

export type DecisionPath = Array<Decision>;

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
  /** set node as chosen */
  setStatus: (nodeId: string[], status: DecisionStatus) => void;
  /** set the path of the decision */
  setPath: (path: DecisionPath) => void;
  /** get the decision path */
  getPath: () => DecisionPath;
  /** remove a decision by node ID and all its children */
  removePathDecision: (nodeId: string) => void;
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
    set(
      {
        tree: layoutTree(get().tree, direction),
        direction,
      },
      false,
      'setTreeDirection'
    );
  },
  setDecisionTree: (tree: PositionUnawareDecisionTree) => {
    set(
      {
        tree: layoutTree(tree),
      },
      false,
      'setNewTree'
    );
  },
  // ToDO: Remove this and corresponding state
  showDecision: (nodeId: string) => {
    set(
      {
        tree: setNodeVisible(get().tree, [nodeId]),
      },
      false,
      'showVertex'
    );
  },
  // ToDO: Remove this and corresponding state
  hideDecision: (nodeId: string) => {
    set(
      {
        tree: setNodesHidden(get().tree, [nodeId]),
      },
      false,
      'hideDecision'
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
  setPath: (path: DecisionPath) => {
    set(
      {
        path,
      },
      false,
      'setPath'
    );
  },
  getPath: () => get().path,
  removePathDecision: (nodeId: string) => {
    const path = get().path;
    const decisionIndex = path.findIndex((decision) => decision.nodeId == nodeId);
    if (decisionIndex === -1) return;
    const newPath = path.slice(0, decisionIndex);
    set(
      {
        path: newPath,
      },
      false,
      'removeDecisionFromPath'
    );
  },
});
