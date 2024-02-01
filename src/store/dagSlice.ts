import { getLayoutElements } from 'hooks/useDecisionTree/layout';
import { Edge } from 'reactflow';
import { DagNode, DecisionTree, TreeNode } from 'store/treeSlice';
import { StateCreator } from 'zustand';

export type DagSlice = {
  dagTree: DecisionTree;
  dagNodes: DagNode[];
  dagEdges: Edge[];
  setDagTree: (tree: DecisionTree) => void;
  showDagChildren: (nodeId: string) => void;
  showDagNode: (nodeId: string) => void;
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
  showDagNode: (nodeId: string) => {
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
    // get layout position for the node
    const { nodes: positionedNodes, edges: positionedEdges } = getLayoutElements(
      [...dagNodes, newNode],
      dagEdges
    );
    console.log('positionedNodes', positionedNodes);
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
  /**
   * Show the direct children of a node in the tree
   * @param nodeId
   */
  showDagChildren: (nodeId: string) => {
    // Get the data for the node
    const treeNode = get().dagTree[nodeId];
    const dagTree = get().dagTree;
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
      };
    });
    // set the children as not hidden in the tree
    const newTree = { ...get().dagTree };
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
});
