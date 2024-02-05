import { Edge, Node } from 'reactflow';
import { createDagEdge, createDagNode, getDescendantIds } from 'store/DagSlice/dagUtils';
import { buildPositionedTree } from 'store/DagSlice/treeLayout';
import { StateCreator } from 'zustand';

/**
 * data needed by all TreeNodes that contains the nodes expanded state, the node's children, and the node's text
 */
export interface NodeConfig {
  label: string;
  children: string[];
  expanded?: boolean;
}

/**
 * data needed by the BooleanTreeNode to render decisions
 */
export interface BooleanNodeConfig extends NodeConfig {
  yesId: string;
  noId: string;
}

/** A vertex in our decision tree.*/
export interface TreeNode extends Omit<Node, 'position'> {
  data: NodeConfig | BooleanNodeConfig;
  position?: { x: number; y: number };
}

/**
 * A decision tree is a map of all node IDs to TreeNodes
 * There may be some performance optimizations to be made here by using a Map instead of a Object
 */
export type DecisionTree = Record<string, TreeNode>;

/**
 * A wrapper for the ReactFlow Node
 * (to make things easier to read and avoid the IDE trying to use the Node.js runtime)
 */
export interface DagNode extends Node {}

export interface ShowDagNodeOptions {
  parentId?: string;
}

export type DagSlice = {
  dagTree: DecisionTree;
  dagNodes: DagNode[];
  dagEdges: Edge[];
  setDagTree: (tree: DecisionTree) => void;
  showDagChildren: (nodeId: string) => void;
  hideDagDescendants: (nodeId: string) => void;
  showDagNode: (nodeId: string, options?: ShowDagNodeOptions) => void;
  hideDagNode: (nodeId: string) => void;
};

export const createDagSlice: StateCreator<DagSlice, [['zustand/devtools', never]], [], DagSlice> = (
  set,
  get
) => ({
  dagEdges: [],
  dagNodes: [],
  dagTree: {},
  /**
   * Set the decision tree for the DAG
   * The decision tree acts as the source of truth for the DAG - we create nodes and edges from it
   * and then use the DAG to render the graph
   * @param tree
   */
  setDagTree: (tree: DecisionTree) => {
    const positionAwareTree = buildPositionedTree(tree);
    set(
      {
        dagTree: positionAwareTree,
      },
      false,
      'setNewTree'
    );
  },
  /**
   * Show a node in the tree - Currently does not create edges
   * @param nodeId
   * @param options
   */
  showDagNode: (nodeId: string, options?: ShowDagNodeOptions) => {
    // Get the data for the tree
    const dagTree = { ...get().dagTree };
    const dagNodes = [...get().dagNodes.filter((node) => node.id !== nodeId)];
    const dagEdges = [...get().dagEdges];
    dagTree[nodeId].hidden = false;
    const newNode = createDagNode(nodeId, dagTree[nodeId]);
    if (options?.parentId) {
      dagEdges.push(createDagEdge(options.parentId, nodeId));
    }
    set(
      {
        dagTree: dagTree,
        dagNodes: [...dagNodes, newNode],
        dagEdges: dagEdges,
      },
      false,
      'showDagNode'
    );
  },
  /**
   * Hide a node and all of its descendants
   * @param nodeId
   */
  hideDagNode: (nodeId: string) => {
    const dagTree = get().dagTree;
    const dagNodes = get().dagNodes;
    const dagEdges = get().dagEdges;
    dagTree[nodeId].hidden = true;
    // remove the node and edges
    const newNodes = dagNodes.filter((node) => node.id !== nodeId);
    const newEdges = dagEdges.filter((edge) => edge.target !== nodeId);
    set(
      {
        dagTree: dagTree,
        dagNodes: newNodes,
        dagEdges: newEdges,
      },
      false,
      'hideDagNode'
    );
  },
  /**
   * Show the direct children of a node in the tree
   * @param nodeId
   */
  showDagChildren: (nodeId: string) => {
    // Get the data for the node
    const dagTree = get().dagTree;
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
        dagTree: newTree,
      },
      false,
      'showNewChildren'
    );
  },
  /**
   * Hide the descendants of a node in the tree
   * @param nodeId
   */
  hideDagDescendants: (nodeId: string) => {
    const dagTree = get().dagTree;
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
        dagTree: dagTree,
        dagNodes: newNodes,
        dagEdges: newEdges,
      },
      false,
      'hideDagDescendants'
    );
  },
});
