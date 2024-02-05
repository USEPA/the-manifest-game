import dagre from '@dagrejs/dagre';
import { Edge } from 'reactflow';
import { createDagEdge } from 'store/DagSlice/dagUtils';
import { DagNode, TreeNode } from 'store/index';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const defaultNodeWidth = 200;
const defaultNodeHeight = 150;
const boolNodeWidth = defaultNodeWidth + 50;
const boolNodeHeight = defaultNodeHeight + 50;
const shiftYForHeader = 100;
const shiftOffEdge = 50;

/** Accepts a object of position unaware nodes, builds a temporary edges and nodes array,
 * and returns an object of position aware nodes */
export const buildDagPositions = (tree: Record<string, TreeNode>) => {
  dagreGraph.setGraph({ rankdir: 'TB' });

  // build edges
  const edges: Edge[] = [];
  Object.values(tree).forEach((node) => {
    if (node.data.children) {
      node.data.children.forEach((child) => {
        edges.push(createDagEdge(node.id, child));
      });
    }
  });

  Object.values(tree).forEach((node) => {
    const nodeHeight = node.type === 'BoolNode' ? boolNodeHeight : defaultNodeHeight;
    const nodeWidth = node.type === 'BoolNode' ? boolNodeWidth : defaultNodeWidth;
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  Object.values(tree).forEach((node) => {
    if ('position' in node) {
      return node as DagNode;
    } else {
      const nodeWithPosition = dagreGraph.node(node.id);
      const newNode = {
        ...node,
        position: {
          x: nodeWithPosition.x - defaultNodeWidth / 2 + shiftOffEdge,
          y: nodeWithPosition.y - defaultNodeHeight / 2 + shiftYForHeader,
        },
      };
      return newNode as DagNode;
    }
  });

  return { nodes: tree, edges } as const;
};
