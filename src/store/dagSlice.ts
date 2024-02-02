import { getLayoutElements } from 'hooks/useDecisionTree/layout';
import { Edge, Node } from 'reactflow';
import { getDescendantIds } from 'store/treeUtils';
import { StateCreator } from 'zustand';

/**
 * data needed by all TreeNodes that contains the nodes expanded state, the node's children, and the node's text
 */
interface TreeNodeData {
  label: string;
  children: string[];
  expanded?: boolean;
}

/**
 * data needed by the BooleanTreeNode to render decisions
 */
interface BooleanTreeNodeData extends TreeNodeData {
  yesId: string;
  noId: string;
}

/** A vertex in our decision tree. it is position (x/Y coordinate) unaware */
export interface TreeNode extends Omit<Node, 'position'> {
  data: TreeNodeData | BooleanTreeNodeData;
}

/**
 * A decision tree is a map of all node IDs to TreeNodes
 * There may be some performance optimizations to be made here by using a Map instead of a Record
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
   * @param tree
   */
  setDagTree: (tree: DecisionTree) => {
    set(
      {
        dagTree: tree,
      },
      false,
      'setNewTree'
    );
  },
  /**
   * Show a node in the tree - Currently does not create edges
   * @param nodeId
   */
  showDagNode: (nodeId: string, options?: ShowDagNodeOptions) => {
    // Get the data for the tree
    const dagTree = { ...get().dagTree };
    const dagNodes = [...get().dagNodes.filter((node) => node.id !== nodeId)];
    const dagEdges = [...get().dagEdges];
    // set the node as not hidden in the tree
    dagTree[nodeId].hidden = false;
    // create the new node
    const newNode: TreeNode = {
      ...dagTree[nodeId],
      connectable: false,
      draggable: false,
      id: nodeId,
      data: dagTree[nodeId].data,
      type: dagTree[nodeId].type ?? 'default',
    };
    // if parentId is provided, create an edge
    if (options?.parentId) {
      dagEdges.push({
        id: `${options.parentId}-${nodeId}`,
        source: options.parentId,
        target: nodeId,
      });
    }
    // get layout position for the node
    const { nodes: positionedNodes, edges: positionedEdges } = getLayoutElements(
      [...dagNodes, newNode],
      dagEdges
    );
    set(
      {
        dagTree: dagTree,
        dagNodes: positionedNodes,
        dagEdges: positionedEdges,
      },
      false,
      'showDagNode'
    );
  },
  hideDagNode: (nodeId: string) => {
    const dagTree = get().dagTree;
    const dagNodes = get().dagNodes;
    const dagEdges = get().dagEdges;
    // set the node as hidden in the tree
    dagTree[nodeId].hidden = true;
    // remove the node and edges
    const newNodes = dagNodes.filter((node) => node.id !== nodeId);
    const newEdges = dagEdges.filter((edge) => edge.target !== nodeId);
    const { nodes: positionedNodes, edges: positionedEdges } = getLayoutElements(
      newNodes,
      newEdges
    );
    set(
      {
        dagTree: dagTree,
        dagNodes: positionedNodes,
        dagEdges: positionedEdges,
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
    // check if the node has children
    if (!treeNode.data.children) return;
    // Get the children nodes
    const childrenNodes = treeNode.data.children.map((childId) => ({
      ...dagTree[childId],
      type: dagTree[childId].type ?? 'default',
    }));
    // create the new edges
    const newEdges = childrenNodes.map((childNode) => {
      return {
        id: `${nodeId}-${childNode.id}`,
        source: nodeId,
        target: childNode.id,
      };
    });
    // create the new nodes
    const newNodes = childrenNodes.map((childNode) => {
      return {
        ...childNode,
        id: childNode.id,
        data: childNode.data,
        hidden: false,
      };
    });
    // set the children as not hidden in the tree
    const newTree = { ...dagTree };
    childrenNodes.forEach((childNode) => (newTree[childNode.id].hidden = false));
    // set the parent as expanded
    newTree[nodeId].data.expanded = true;
    // get layout position for the nodes
    const { nodes: positionedNodes, edges: positionedEdges } = getLayoutElements(
      [...dagNodes, ...newNodes],
      [...dagEdges, ...newEdges]
    );
    // set the new nodes and edges
    set(
      {
        dagNodes: positionedNodes,
        dagEdges: positionedEdges,
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
    // set the children as hidden in the tree
    childrenIds.forEach((id) => (dagTree[id].hidden = true));
    // remove the children nodes and edges
    const newNodes = dagNodes.filter((node) => !childrenIds.includes(node.id));
    const newEdges = dagEdges.filter((edge) => !childrenIds.includes(edge.target));
    const { nodes: positionedNodes, edges: positionedEdges } = getLayoutElements(
      newNodes,
      newEdges
    );
    // set parent as not expanded
    dagTree[nodeId].data.expanded = false;
    set(
      {
        dagTree: dagTree,
        dagNodes: positionedNodes,
        dagEdges: positionedEdges,
      },
      false,
      'hideDagDescendants'
    );
  },
});
