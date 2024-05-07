import { Node } from 'reactflow';
import { layoutTree } from 'store/TreeSlice/layout';
import { getAncestorIds, setNodesHidden, setNodeVisible } from 'store/TreeSlice/treeSliceUtils';
import { StateCreator } from 'zustand';

export type VertexStatus = 'unselect' | 'chosen' | 'focused' | undefined;

/** Data needed by all nodes in our tree*/
export interface VertexData {
  label: string;
  children: string[];
  status?: VertexStatus;
  help?: string;
}

/** data needed by the BooleanTreeNode to render decisions*/
export interface BooleanVertexData extends VertexData {
  yesId: string;
  noId: string;
}

/** A vertex in our decision tree.*/
export interface Vertex extends Omit<Node, 'position'> {
  data: VertexData | BooleanVertexData;
  position: { x: number; y: number; rank?: number };
}

/**
 * A decision tree is a map of all node IDs to TreeNodes
 * There may be some performance optimizations to be made here by using a Map instead of a Object
 */
export type DecisionTree = Record<string, Vertex>;

export type PositionUnawareDecisionTree = Record<string, Omit<Vertex, 'position'>>;

export type TreeDirection = 'TB' | 'LR';

export interface Decision {
  nodeId: string;
  selected: string | boolean;
}

export type DecisionPath = Array<Decision>;

interface TreeSliceState {
  tree: DecisionTree;
  direction: TreeDirection;
  path: DecisionPath;
}

interface TreeSliceActions {
  /** build and Set the decision tree from a config. It acts as the database we build nodes from*/
  setDecisionTree: (tree: PositionUnawareDecisionTree) => void;
  /** Set the layout direction */
  setTreeDirection: (direction: TreeDirection) => void;
  /** Set vertex as visible */
  setVertexVisible: (nodeId: string) => void;
  /** Set decision as hidden */
  setVertexHidden: (nodeId: string) => void;
  /** set node as chosen */
  setVertexStatus: (nodeId: string[], status: VertexStatus) => void;
  /** set the path of the decision */
  setPath: (path: DecisionPath) => void;
  /** get the decision path */
  getPath: () => DecisionPath;
  /** remove a decision by node ID and all its children */
  removePathDecision: (nodeId: string) => void;
  /** get ancestor IDs */
  getAncestorDecisions: (nodeId: string) => string[];
}

export interface TreeSlice extends TreeSliceActions, TreeSliceState {}

export const createTreeSlice: StateCreator<
  TreeSlice,
  [['zustand/devtools', never]],
  [],
  TreeSlice
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
  setVertexVisible: (nodeId: string) => {
    set(
      {
        tree: setNodeVisible(get().tree, [nodeId]),
      },
      false,
      'setVertexVisible'
    );
  },
  // ToDO: Remove this and corresponding state
  setVertexHidden: (nodeId: string) => {
    set(
      {
        tree: setNodesHidden(get().tree, [nodeId]),
      },
      false,
      'setVertexHidden'
    );
  },
  setVertexStatus: (nodeIds: string[], status: VertexStatus) => {
    const tree = get().tree;
    nodeIds.forEach((nodeId) => {
      tree[nodeId].data.status = status ?? undefined;
    });
    set(
      {
        tree,
      },
      false,
      'setVertexStatus'
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
  getAncestorDecisions: (nodeId: string) => {
    const tree = get().tree;
    return getAncestorIds(tree, nodeId);
  },
});
