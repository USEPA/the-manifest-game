import { ManifestNode } from "components/Tree/nodes";
import { Edge } from "reactflow";

export const Tree = {
  /** Create a decision tree node with defaults applied */
  createManifestNode: (data: Partial<ManifestNode>): ManifestNode => {
    return {
      id: "1",
      hidden: true,
      connectable: false,
      draggable: false,
      position: { x: 100, y: 100 },
      data: { label: "foo" },
      ...data,
    };
  },

  /** Recursively convert a nested array/tree of nodes into a flattened representation */
  flattenTreeNodes: (nodes: Array<ManifestNode>): Array<ManifestNode> => {
    let flatNodes: Array<ManifestNode> = [];

    nodes.forEach((node) => {
      flatNodes.push(node);

      if (node.children) {
        flatNodes = flatNodes.concat(Tree.flattenTreeNodes(node.children));
      }
    });

    return flatNodes;
  },

  /** Recursively convert a nested array/tree of nodes into a flattened object */
  flattenNodesToObject: (
    nodes: Array<ManifestNode>,
  ): Record<string, ManifestNode> => {
    let flatNodes: Record<string, ManifestNode> = {};

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
    };
  },

  /** Recursively traverse and create the edges of the decision tree */
  createTreeEdges: (nodes: Array<ManifestNode>): Array<Edge> => {
    let edges: Array<Edge> = [];

    nodes.forEach((node) => {
      if (node.children) {
        node.children.forEach((child) => {
          edges.push(Tree.createManifestEdge(node.id, child.id));
        });
        edges = edges.concat(Tree.createTreeEdges(node.children));
      }
    });

    return edges;
  },

  /** Recursively get a node's children IDs */
  getRecursiveChildrenIds: (
    nodes: Record<string, ManifestNode>,
    id: string,
  ): string[] => {
    let childrenIds: string[] = [];

    if (nodes[id]?.children) {
      nodes[id].children?.forEach((child) => {
        childrenIds.push(child.id);
        childrenIds = childrenIds.concat(
          Tree.getRecursiveChildrenIds(nodes, child.id),
        );
      });
    }

    return childrenIds;
  },

  /** a node's direct children IDs */
  getChildrenIds: (
    nodes: Record<string, ManifestNode>,
    id: string,
  ): string[] => {
    const childrenIds: string[] = [];

    if (nodes[id]?.children) {
      nodes[id].children?.forEach((child) => {
        childrenIds.push(child.id);
      });
    }

    return childrenIds;
  },

  /** Convert an object tree into an array of nodes */
  convertObjectToNodes: (
    nodes: Record<string, ManifestNode>,
  ): Array<ManifestNode> => {
    const nodesArray: Array<ManifestNode> = [];

    Object.keys(nodes).forEach((key) => {
      nodesArray.push(nodes[key]);
    });

    return nodesArray;
  },

  /** Hide edges by node IDs */
  setHiddenEdges: (
    edges: Array<Edge>,
    nodeId: string[],
    hidden: boolean,
  ): Array<Edge> => {
    return edges.map((edge) => {
      if (nodeId.includes(edge.target)) {
        return { ...edge, hidden };
      }
      return edge;
    });
  },

  /** expand a node and un-hide its children */
  expandNode: (
    tree: Record<string, ManifestNode>,
    node: ManifestNode,
  ): Record<string, ManifestNode> => {
    const childrenIds = Tree.getChildrenIds(tree, node.id);
    const newTree = { ...tree };
    newTree[node.id] = { ...node, expanded: !node.expanded };
    childrenIds.forEach((target) => {
      newTree[target].hidden = false;
    });
    return newTree;
  },
};
