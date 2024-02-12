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
  applyPositionToNodes,
  createDagEdge,
  createDagNode,
  getDescendantIds,
  getSiblingIds,
} from 'store/DagSlice/dagUtils';
import { layoutTree } from 'store/DagSlice/layout';
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
  decisionTree: DecisionTree;
  dagNodes: DagNode[];
  dagEdges: Edge[];
  treeDirection: DagDirection;
}

interface DagActions {
  /**
   * Set the decision tree and build node positions for the DAG from a configuration
   * The decision tree acts as the source of truth for the DAG - we create nodes and edges from it
   * and update the decision tree when changes are made to the DAG
   */
  setDecisionTree: (tree: PositionUnawareDecisionTree) => void;
  /** Show the direct children of a node in the tree */
  showDagChildren: (nodeId: string) => void;
  /** Hide the descendants of a node in the tree */
  hideDagDescendants: (nodeId: string) => void;
  /** Show a node in the tree - Currently does not create edges*/
  showDagNode: (nodeId: string, options?: ShowDagNodeOptions) => void;
  /** Hide a node and all of its descendants*/
  hideDagNode: (nodeId: string) => void;
  /** Hide the descendants of a node's siblings in the tree (the nodes nieces/nephews AKA niblings)*/
  hideDagNiblings: (nodeId: string) => void;
  /** Set the layout direction */
  setDagDirection: (direction: DagDirection) => void;
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
  decisionTree: {},
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
  treeDirection: 'TB',
  setDagDirection: (treeDirection: DagDirection) => {
    const decisionTree = layoutTree(get().decisionTree, treeDirection);
    const dagNodes = applyPositionToNodes(decisionTree, get().dagNodes);
    set(
      {
        treeDirection,
        decisionTree,
        dagNodes,
      },
      false,
      'setDagDirection'
    );
  },
  setDecisionTree: (tree: PositionUnawareDecisionTree) => {
    const positionAwareTree = layoutTree(tree);
    set(
      {
        decisionTree: positionAwareTree,
      },
      false,
      'setNewTree'
    );
  },
  showDagNode: (nodeId: string, options?: ShowDagNodeOptions) => {
    const decisionTree = get().decisionTree;
    const dagEdges = get().dagEdges;
    const dagNodes = removeNodes(get().dagNodes, [nodeId]);
    decisionTree[nodeId].hidden = false;
    const newNode = createDagNode(nodeId, decisionTree[nodeId]);
    if (options?.parentId) {
      dagEdges.push(createDagEdge(options.parentId, nodeId));
    }
    set(
      {
        decisionTree,
        dagNodes: [...dagNodes, newNode],
        dagEdges,
      },
      false,
      'showDagNode'
    );
  },
  hideDagNode: (nodeId: string) => {
    const tree = get().decisionTree;
    tree[nodeId].hidden = true;
    const newNodes = removeNodes(get().dagNodes, [nodeId]);
    const newEdges = get().dagEdges.filter((edge) => edge.target !== nodeId);
    set(
      {
        decisionTree: tree,
        dagNodes: newNodes,
        dagEdges: newEdges,
      },
      false,
      'hideDagNode'
    );
  },
  showDagChildren: (nodeId: string) => {
    const tree = get().decisionTree;
    const treeNode = tree[nodeId];
    const dagEdges = get().dagEdges;
    const dagNodes = get().dagNodes;
    const childrenData = getTreeChildren(tree, treeNode);
    const newEdges = createChildrenEdges(nodeId, childrenData);
    const newNodes = createChildrenNodes(childrenData);
    childrenData.forEach((childNode) => (tree[childNode.id].hidden = false));
    tree[nodeId].data.expanded = true;
    set(
      {
        dagNodes: [...dagNodes, ...newNodes],
        dagEdges: [...dagEdges, ...newEdges],
        decisionTree: tree,
      },
      false,
      'showNewChildren'
    );
  },
  hideDagDescendants: (nodeId: string) => {
    const dagTree = get().decisionTree;
    const childrenIds = getDescendantIds(dagTree, nodeId);
    childrenIds.forEach((id) => (dagTree[id].hidden = true));
    const dagNodes = removeNodes(get().dagNodes, childrenIds);
    const dagEdges = get().dagEdges.filter((edge) => !childrenIds.includes(edge.target));
    dagTree[nodeId].data.expanded = false;
    set(
      {
        decisionTree: dagTree,
        dagNodes,
        dagEdges,
      },
      false,
      'hideDagDescendants'
    );
  },
  hideDagNiblings: (nodeId: string) => {
    const dagTree = get().decisionTree;
    const siblingIds = getSiblingIds(dagTree, nodeId);
    const siblingDescendants = siblingIds.flatMap((id) => getDescendantIds(dagTree, id));
    siblingIds.forEach((id) => (dagTree[id].data.expanded = false));
    const dagNodes = removeNodes(get().dagNodes, siblingDescendants);
    const dagEdges = get().dagEdges.filter((edge) => !siblingDescendants.includes(edge.target));
    set(
      {
        decisionTree: dagTree,
        dagNodes,
        dagEdges,
      },
      false,
      'hideNiblings'
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

const removeNodes = (nodes: DagNode[], ids: string[]): DagNode[] => {
  return nodes.filter((node) => !ids.includes(node.id));
};
