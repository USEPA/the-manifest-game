import { BooleanNodeData, NodeData } from 'hooks/useFetchConfig/useFetchConfig';
import {
  applyEdgeChanges,
  applyNodeChanges,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  OnEdgesChange,
  OnNodesChange,
} from 'reactflow';
import {
  addDagEdge,
  applyPositionToNodes,
  createDagEdge,
  createDagNode,
} from 'store/DagSlice/dagUtils';
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

export type DagDirection = 'TB' | 'LR';

interface DagState {
  dagNodes: DagNode[];
  dagEdges: Edge[];
}

interface DagActions {
  /** Show the direct children of a node in the tree */
  createChildrenNodes: (nodeId: string, tree: DecisionTree) => void;
  /** Show a node in the tree - Currently does not create edges*/
  createNode: (nodeId: string, tree: DecisionTree, options?: ShowDagNodeOptions) => void;
  /** Hide a node and all of its descendants*/
  removeNodes: (nodeId: string[]) => void;
  /** Set the layout direction */
  setNodePositions: (tree: DecisionTree) => void;
  /** Used to apply update to existing nodes - used by the react-flow library*/
  onNodesChange: OnNodesChange;
  /** Used to apply update to existing edges - used by the react-flow library*/
  onEdgesChange: OnEdgesChange;
}

export interface DagSlice extends DagState, DagActions {}

export const createDagSlice: StateCreator<DagSlice, [['zustand/devtools', never]], [], DagSlice> = (
  set,
  get
) => ({
  dagEdges: [],
  dagNodes: [],
  onNodesChange: (changes: NodeChange[]) => {
    set(
      {
        dagNodes: applyNodeChanges(changes, get().dagNodes),
      },
      false,
      'onNodesChange'
    );
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set(
      {
        dagEdges: applyEdgeChanges(changes, get().dagEdges),
      },
      false,
      'onEdgesChange'
    );
  },
  setNodePositions: (tree: DecisionTree) => {
    const dagNodes = applyPositionToNodes(tree, get().dagNodes);
    set(
      {
        dagNodes,
      },
      false,
      'setNodeLayout'
    );
  },

  /** ToDo: Options temporary, to be removed when we separate the EdgeSlice*/
  createNode: (nodeId: string, tree: DecisionTree, options?: ShowDagNodeOptions) => {
    const dagEdges = options?.parentId
      ? addDagEdge(get().dagEdges, {
          source: options.parentId,
          target: nodeId,
        })
      : get().dagEdges;
    const dagNodes = filterNodes(get().dagNodes, [nodeId]);
    const newNode = createDagNode(nodeId, tree[nodeId]);
    set(
      {
        dagNodes: [...dagNodes, newNode],
        dagEdges,
      },
      false,
      'createNode'
    );
  },
  removeNodes: (nodeId: string[]) => {
    const newNodes = filterNodes(get().dagNodes, nodeId);
    const newEdges = get().dagEdges.filter((edge) => !nodeId.includes(edge.target));
    set(
      {
        dagNodes: newNodes,
        dagEdges: newEdges,
      },
      false,
      'removeDagNode'
    );
  },
  createChildrenNodes: (nodeId: string, tree: DecisionTree) => {
    const childrenData = getTreeChildren(tree, tree[nodeId]);
    const newEdges = createChildrenEdges(nodeId, childrenData);
    const newNodes = createChildrenNodes(childrenData);
    childrenData.forEach((childNode) => (tree[childNode.id].hidden = false));
    set(
      {
        dagNodes: [...get().dagNodes, ...newNodes],
        dagEdges: [...get().dagEdges, ...newEdges],
      },
      false,
      'showNewChildren'
    );
  },
});

const getTreeChildren = (tree: DecisionTree, treeNode: TreeNode): DagNode[] => {
  return treeNode.data.children.map((childId) => ({
    ...tree[childId],
  }));
};

const createChildrenEdges = (parentId: string, children: TreeNode[]): Edge[] => {
  return children.map((child) => createDagEdge(parentId, child.id));
};

const createChildrenNodes = (children: TreeNode[]): DagNode[] => {
  return children.map((treeNode) => {
    return createDagNode(treeNode.id, { ...treeNode, hidden: false });
  });
};

const filterNodes = (nodes: DagNode[], ids: string[]): DagNode[] => {
  return nodes.filter((node) => !ids.includes(node.id));
};
