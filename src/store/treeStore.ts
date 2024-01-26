import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  Edge,
  EdgeChange,
  MarkerType,
  Node,
  NodeChange,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
} from 'reactflow';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface TreeNodeData {
  label: string;
  children: string[];
  expanded?: boolean;
}

interface BooleanTreeNodeData extends TreeNodeData {
  yesId: string;
  noId: string;
}

export interface TreeNode extends Omit<Node, 'position'> {
  data: TreeNodeData | BooleanTreeNodeData;
}

export type DecisionTree = Record<string, TreeNode>;

export type TreeStore = {
  tree: DecisionTree;
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  setTree: (tree: DecisionTree) => void;
  updateNode: (node: Partial<TreeNode>) => void;
  hideNode: (nodeId: string) => void;
};

const treeStore = create<TreeStore>()(
  devtools(
    (set, get) => ({
      tree: {},
      nodes: [],
      edges: [],
      onNodesChange: (changes: NodeChange[]) => {
        set({
          nodes: applyNodeChanges(changes, get().nodes),
        });
      },
      onEdgesChange: (changes: EdgeChange[]) => {
        set({
          edges: applyEdgeChanges(changes, get().edges),
        });
      },
      onConnect: (connection: Connection) => {
        set({
          edges: addEdge(connection, get().edges),
        });
      },
      setNodes: (nodes: Node[]) => {
        set({
          nodes: nodes,
        });
      },
      setEdges: (edges: Edge[]) => {
        set({
          edges: edges,
        });
      },
      setTree: (tree: DecisionTree) => {
        set({
          tree: tree,
        });
      },
      /** hides the TreeNode by id and all nodes and edges recursively */
      hideNode: (nodeId: string) => {
        const childrenIds = getRecursiveChildrenIds(get().tree, nodeId);
        const targetNodeIds = [nodeId, ...childrenIds];
        const updatedEdges = hideTargetEdges({
          edges: get().edges,
          targetNodeIds: targetNodeIds,
        });
        // update the tree
        const tree = get().tree;
        Object.keys(tree).forEach((key) => {
          if (targetNodeIds.includes(key)) {
            tree[key].hidden = true;
          }
        });
        set({
          edges: updatedEdges,
          tree: tree,
        });
      },
      /** updates the TreeNode by id */
      updateNode: (node: Partial<TreeNode>) => {
        if (!node.id) {
          throw new Error('Cannot update node without id');
        }
        set({
          tree: {
            ...get().tree,
            [node.id]: {
              ...get().tree[node.id],
              ...node,
            },
          },
        });
      },
    }),
    { name: 'decisionTree', anonymousActionType: 'unknown' }
  )
);

/** creates the edges (lines between nodes) that connect nodes */
export const createManifestEdge = (source: string, target: string): Edge => {
  return {
    id: `${source}-${target}`,
    hidden: false,
    source,
    target,
    type: 'smoothstep',
    markerEnd: { type: MarkerType.ArrowClosed },
  };
};

/** Hide edges that include the given node IDs as their target - returns a new array of edges */
export const hideTargetEdges = ({
  edges,
  targetNodeIds,
  hidden = true,
}: {
  edges: Array<Edge>;
  targetNodeIds: string[];
  hidden?: boolean;
}): Array<Edge> => {
  return edges.map((edge) => {
    if (targetNodeIds.includes(edge.target)) {
      return { ...edge, hidden };
    }
    return edge;
  });
};
/** loop through DecisionTree and create an array of React flow edges */
export const buildTreeEdges = (tree: DecisionTree): Array<Edge> => {
  const edges: Array<Edge> = [];

  Object.keys(tree).forEach((key) => {
    const node = tree[key];
    if (node.data.children) {
      node.data.children.forEach((childId: string) => {
        edges.push(createManifestEdge(node.id, childId));
      });
    }
  });

  return edges;
};
/** recursively traverse a DecisionTree and create an array of nodes children IDs */
export const getRecursiveChildrenIds = (tree: DecisionTree, id: string): string[] => {
  let childrenIds: string[] = [];

  if (tree[id]?.data.children) {
    tree[id].data.children?.forEach((child) => {
      childrenIds.push(child);
      childrenIds = childrenIds.concat(getRecursiveChildrenIds(tree, child));
    });
  }

  return childrenIds;
};

export default treeStore;
