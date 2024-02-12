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
  hideNiblings: (nodeId: string) => void;
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
    set({
      dagNodes: applyNodeChanges(changes, get().dagNodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      dagEdges: applyEdgeChanges(changes, get().dagEdges),
    });
  },
  treeDirection: 'TB',
  setDagDirection: (treeDirection: DagDirection) => {
    const oldTree = get().decisionTree;
    const oldNodes = get().dagNodes;
    const decisionTree = layoutTree(oldTree, treeDirection);
    const dagNodes = applyPositionToNodes(decisionTree, oldNodes);
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
    // Get the data for the tree
    const dagTree = { ...get().decisionTree };
    const dagNodes = [...get().dagNodes.filter((node) => node.id !== nodeId)];
    const dagEdges = [...get().dagEdges];
    dagTree[nodeId].hidden = false;
    const newNode = createDagNode(nodeId, dagTree[nodeId]);
    if (options?.parentId) {
      dagEdges.push(createDagEdge(options.parentId, nodeId));
    }
    set(
      {
        decisionTree: dagTree,
        dagNodes: [...dagNodes, newNode],
        dagEdges: dagEdges,
      },
      false,
      'showDagNode'
    );
  },
  hideDagNode: (nodeId: string) => {
    const dagTree = get().decisionTree;
    const dagNodes = get().dagNodes;
    const dagEdges = get().dagEdges;
    dagTree[nodeId].hidden = true;
    // remove the node and edges
    const newNodes = dagNodes.filter((node) => node.id !== nodeId);
    const newEdges = dagEdges.filter((edge) => edge.target !== nodeId);
    set(
      {
        decisionTree: dagTree,
        dagNodes: newNodes,
        dagEdges: newEdges,
      },
      false,
      'hideDagNode'
    );
  },
  showDagChildren: (nodeId: string) => {
    // Get the data for the node
    const dagTree = get().decisionTree;
    const treeNode = dagTree[nodeId];
    const dagEdges = get().dagEdges;
    const dagNodes = get().dagNodes;
    if (!treeNode.data.children) return;
    // Get the children nodes
    const childrenNodes = treeNode.data.children.map((childId) => ({
      ...dagTree[childId],
      type: dagTree[childId].type ?? 'default',
    }));
    const newEdges = childrenNodes.map((childNode) => {
      return createDagEdge(nodeId, childNode.id);
    });
    // create the new nodes
    const newNodes = childrenNodes.map((childNode) => {
      return createDagNode(childNode.id, { ...childNode, hidden: false });
    });
    // set the children as not hidden in the tree
    const newTree = { ...dagTree };
    childrenNodes.forEach((childNode) => (newTree[childNode.id].hidden = false));
    newTree[nodeId].data.expanded = true;
    set(
      {
        dagNodes: [...dagNodes, ...newNodes],
        dagEdges: [...dagEdges, ...newEdges],
        decisionTree: newTree,
      },
      false,
      'showNewChildren'
    );
  },
  hideDagDescendants: (nodeId: string) => {
    const dagTree = get().decisionTree;
    const dagNodes = get().dagNodes;
    const dagEdges = get().dagEdges;
    const childrenIds = getDescendantIds(dagTree, nodeId);
    childrenIds.forEach((id) => (dagTree[id].hidden = true));
    // remove the children nodes and edges
    const newNodes = dagNodes.filter((node) => !childrenIds.includes(node.id));
    const newEdges = dagEdges.filter((edge) => !childrenIds.includes(edge.target));
    // set parent as not expanded
    dagTree[nodeId].data.expanded = false;
    set(
      {
        decisionTree: dagTree,
        dagNodes: newNodes,
        dagEdges: newEdges,
      },
      false,
      'hideDagDescendants'
    );
  },
  hideNiblings: (nodeId: string) => {
    const dagTree = get().decisionTree;
    const dagNodes = get().dagNodes;
    const dagEdges = get().dagEdges;
    const siblingIds = getSiblingIds(dagTree, nodeId);
    const siblingDescendants = siblingIds.flatMap((id) => getDescendantIds(dagTree, id));
    siblingIds.forEach((id) => (dagTree[id].data.expanded = false));
    // remove the nieces/nephews nodes and edges
    const newNodes = dagNodes.filter((node) => !siblingDescendants.includes(node.id));
    const newEdges = dagEdges.filter((edge) => !siblingDescendants.includes(edge.target));
    set(
      {
        decisionTree: dagTree,
        dagNodes: newNodes,
        dagEdges: newEdges,
      },
      false,
      'hideNiblings'
    );
  },
});
