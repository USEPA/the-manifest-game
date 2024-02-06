import { BooleanNodeData, NodeData } from 'hooks/useFetchConfig/useFetchConfig';
import { Edge, Node } from 'reactflow';
import {
  createDagEdge,
  createDagNode,
  getDescendantIds,
  getSiblingIds,
} from 'store/DagSlice/dagUtils';
import { buildPositionedTree } from 'store/DagSlice/layout';
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

/**
 * A wrapper for the ReactFlow Node
 * (to make things easier to read and avoid the IDE trying to use the Node.js runtime)
 */
export interface DagNode extends Node {}

export interface ShowDagNodeOptions {
  parentId?: string;
}

export type DagDirection = 'TB' | 'LR';

export type DagSlice = {
  dagTree: DecisionTree;
  dagNodes: DagNode[];
  dagEdges: Edge[];
  dagDirection: DagDirection;
  setDagTree: (tree: PositionUnawareDecisionTree) => void;
  showDagChildren: (nodeId: string) => void;
  hideDagDescendants: (nodeId: string) => void;
  showDagNode: (nodeId: string, options?: ShowDagNodeOptions) => void;
  hideDagNode: (nodeId: string) => void;
  hideNiblings: (nodeId: string) => void;
  setDagDirection: (direction: 'TB' | 'LR') => void;
};

export const createDagSlice: StateCreator<DagSlice, [['zustand/devtools', never]], [], DagSlice> = (
  set,
  get
) => ({
  dagEdges: [],
  dagNodes: [],
  dagTree: {},
  dagDirection: 'TB',
  setDagDirection: (direction: DagDirection) => {
    const dagTree = get().dagTree;
    const dagNodes = get().dagNodes;
    const rebuiltDagTree = buildPositionedTree(dagTree, direction);
    const rebuiltNodes = dagNodes.map((node) => {
      const newNode = { ...node };
      newNode.position = {
        x: rebuiltDagTree[node.id].position.x,
        y: rebuiltDagTree[node.id].position.y,
      };
      return newNode;
    });
    set(
      {
        dagDirection: direction,
        dagTree: rebuiltDagTree,
        dagNodes: rebuiltNodes,
      },
      false,
      'setDagDirection'
    );
  },
  /**
   * Set the decision tree and build positions for the DAG from a configuration
   * The decision tree acts as the source of truth for the DAG - we create nodes and edges from it
   * and then use the DAG nodes to render the graph
   * @param tree
   */
  setDagTree: (tree: PositionUnawareDecisionTree) => {
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
  /** Hide the descendants of a node's siblings in the tree (the nodes nieces/nephews AKA niblings)*/
  hideNiblings: (nodeId: string) => {
    const dagTree = get().dagTree;
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
        dagTree: dagTree,
        dagNodes: newNodes,
        dagEdges: newEdges,
      },
      false,
      'hideNiblings'
    );
  },
});
