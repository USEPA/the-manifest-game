import { ManifestNode } from "components/Tree/nodes";
import { Edge } from "reactflow";

export const tree = {
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
  flattenTreeNodes: (nodes: Array<ManifestNode>): Array<ManifestNode> => {
    let flatNodes: Array<ManifestNode> = [];

    nodes.forEach((node) => {
      flatNodes.push(node);

      if (node.children) {
        flatNodes = flatNodes.concat(tree.flattenTreeNodes(node.children));
      }
    });

    return flatNodes;
  },

  createManifestEdge: (source: string, target: string): Edge => {
    return {
      id: `${source}-${target}`,
      hidden: false,
      source,
      target,
    };
  },

  createTreeEdges: (nodes: Array<ManifestNode>): Array<Edge> => {
    let edges: Array<Edge> = [];

    nodes.forEach((node) => {
      if (node.children) {
        node.children.forEach((child) => {
          edges.push(tree.createManifestEdge(node.id, child.id));
        });
        edges = edges.concat(tree.createTreeEdges(node.children));
      }
    });

    return edges;
  },
};
