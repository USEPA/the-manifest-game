import { applyNodeChanges, Node, NodeChange, OnNodesChange } from 'reactflow';
import {
  applyPositionToNodes,
  createDagNode,
  filterNodesById,
} from 'store/DagNodeSlice/dagNodeUtils';
import { BooleanNodeData, NodeData } from 'store/DecisionSlice/decisionSlice';
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

/**A wrapper for the ReactFlow Node */
export interface DagNode extends Node {}

export interface ShowDagNodeOptions {
  parentId?: string;
}

interface DagNodeSliceState {
  dagNodes: DagNode[];
}

interface DagNodeSliceActions {
  /** Show a node in the tree - Currently does not create edges*/
  createDagNode: (nodeId: string, tree: DecisionTree) => void;
  /** Hide a node and all of its descendants*/
  removeDagNodes: (nodeId: string[]) => void;
  /** Set the layout direction */
  positionDagNodes: (tree: DecisionTree) => void;
  /** Used to apply update to existing nodes - used by the react-flow library*/
  onNodesChange: OnNodesChange;
}

export interface DagNodeSlice extends DagNodeSliceState, DagNodeSliceActions {}

export const createDagNodeSlice: StateCreator<
  DagNodeSlice,
  [['zustand/devtools', never]],
  [],
  DagNodeSlice
> = (set, get) => ({
  dagEdges: [],
  dagNodes: [],
  /* v8 ignore next 9  - this is something needed by the React flow library, not tested by us*/
  onNodesChange: (changes: NodeChange[]) => {
    set(
      {
        dagNodes: applyNodeChanges(changes, get().dagNodes),
      },
      false,
      'onNodesChange'
    );
  },
  positionDagNodes: (tree: DecisionTree) => {
    const dagNodes = applyPositionToNodes(tree, get().dagNodes);
    set(
      {
        dagNodes,
      },
      false,
      'positionDagNodes'
    );
  },
  createDagNode: (nodeId: string, tree: DecisionTree) => {
    const dagNodes = filterNodesById(get().dagNodes, [nodeId]);
    const newNode = createDagNode(nodeId, tree[nodeId]);
    set(
      {
        dagNodes: [...dagNodes, newNode],
      },
      false,
      'createNode'
    );
  },
  removeDagNodes: (nodeId: string[]) => {
    const newNodes = filterNodesById(get().dagNodes, nodeId);
    set(
      {
        dagNodes: newNodes,
      },
      false,
      'removeNode'
    );
  },
});
