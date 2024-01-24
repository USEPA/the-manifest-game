import { Edge, MarkerType, Node } from 'reactflow';
import { DecisionTree } from 'store/treeStore';

export interface ManifestNode extends Omit<Node, 'position'> {
  expanded?: boolean;
  children?: Array<ManifestNode>;
}

export type ManifestTree = Record<string, ManifestNode>;

export const Tree = {
  // ToDo: createManifestNode should be removed. meant for development purposes
  /** Create a decision tree node with defaults applied */
  createManifestNode: (data: Partial<ManifestNode>): ManifestNode => {
    return {
      id: '1',
      hidden: true,
      connectable: false,
      draggable: false,
      data: { label: 'foo' },
      ...data,
    };
  },

  /** Recursively convert a nested array/tree of nodes into a flattened representation */
  buildTreeNodes: (nodes: Array<ManifestNode>): Array<ManifestNode> => {
    let flatNodes: Array<ManifestNode> = [];

    nodes.forEach((node) => {
      flatNodes.push(node);

      if (node.children) {
        flatNodes = flatNodes.concat(Tree.buildTreeNodes(node.children));
      }
    });

    return flatNodes;
  },

  /** Recursively convert a nested array/tree of nodes into a flattened object */
  flattenNodesToObject: (nodes: Array<ManifestNode>): ManifestTree => {
    let flatNodes: ManifestTree = {};

    nodes.forEach((node) => {
      flatNodes[node.id] = node;

      if (node.children) {
        flatNodes = {
          ...flatNodes,
          ...Tree.flattenNodesToObject(node.children),
        };
      }
    });

    return flatNodes;
  },

  /** creates the edges (lines between nodes) that connect nodes */
  createManifestEdge: (source: string, target: string): Edge => {
    return {
      id: `${source}-${target}`,
      hidden: false,
      source,
      target,
      type: 'smoothstep',
      markerEnd: { type: MarkerType.ArrowClosed },
    };
  },

  /** Recursively traverse and create the edges of the decision tree */
  buildTreeEdges: (nodes: Array<ManifestNode>): Array<Edge> => {
    let edges: Array<Edge> = [];

    nodes.forEach((node) => {
      if (node.children) {
        node.children.forEach((child) => {
          edges.push(Tree.createManifestEdge(node.id, child.id));
        });
        edges = edges.concat(Tree.buildTreeEdges(node.children));
      }
    });

    return edges;
  },

  /** Recursively get a node's children Ids */
  getRecursiveChildrenIds: (nodes: ManifestTree, id: string): string[] => {
    let childrenIds: string[] = [];

    if (nodes[id]?.children) {
      nodes[id].children?.forEach((child) => {
        childrenIds.push(child.id);
        childrenIds = childrenIds.concat(Tree.getRecursiveChildrenIds(nodes, child.id));
      });
    }

    return childrenIds;
  },

  /** a node's direct children Ids */
  getChildrenIds: ({ tree, id }: { tree: ManifestTree; id: string }): string[] => {
    const childrenIds: string[] = [];

    if (tree[id]?.children) {
      tree[id].children?.forEach((child) => {
        childrenIds.push(child.id);
      });
    }

    return childrenIds;
  },

  /** Convert an object tree into an array of nodes */
  mapTreeToNodes: (tree: ManifestTree): Array<ManifestNode> => {
    const nodesArray: Array<ManifestNode> = [];

    Object.keys(tree).forEach((key) => {
      nodesArray.push(tree[key]);
    });

    return nodesArray;
  },

  /** Hide edges by node Ids */
  setHiddenEdges: ({
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
  },

  /** expand a node and un-hide its children */
  expandNode: ({
    tree,
    node,
  }: {
    tree: ManifestTree;
    node: ManifestNode;
  }): Record<string, ManifestNode> => {
    const childrenIds = Tree.getChildrenIds({ tree, id: node.id });
    const newTree = { ...tree };
    newTree[node.id] = { ...node, expanded: !node.expanded };
    childrenIds.forEach((target) => {
      newTree[target].hidden = false;
    });
    return newTree;
  },
};

/** loop through DecisionTree and create an array of React flow edges */
export const buildTreeEdges = (tree: DecisionTree): Array<Edge> => {
  const edges: Array<Edge> = [];

  Object.keys(tree).forEach((key) => {
    const node = tree[key];
    if (node.children) {
      node.children.forEach((child) => {
        edges.push(Tree.createManifestEdge(node.id, child));
      });
    } else if (node.yesId && node.noId) {
      edges.push(Tree.createManifestEdge(node.id, node.yesId));
      edges.push(Tree.createManifestEdge(node.id, node.noId));
    }
  });

  return edges;
};
