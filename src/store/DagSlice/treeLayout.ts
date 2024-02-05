import dagre from '@dagrejs/dagre';
import { Edge } from 'reactflow';
import { createDagEdge } from 'store/DagSlice/dagUtils';
import { TreeNode } from 'store/index';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const defaultNodeWidth = 200;
const defaultNodeHeight = 150;
const boolNodeWidth = defaultNodeWidth + 50;
const boolNodeHeight = defaultNodeHeight + 50;
const shiftYForHeader = 100;
const shiftOffEdge = 50;

/** Accepts an object of position unaware nodes, builds a temporary edges and nodes array,
 * and returns an object of position aware nodes
 *
 * This was initially pulled from the reactflow documentation
 * https://reactflow.dev/learn/layouting/layouting
 */
export const buildPositionedTree = (tree: Record<string, TreeNode>) => {
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
    const nodeWithPosition = dagreGraph.node(node.id);
    node.position = {
      x: nodeWithPosition.x - defaultNodeWidth / 2 + shiftOffEdge,
      y: nodeWithPosition.y - defaultNodeHeight / 2 + shiftYForHeader,
    };
  });

  return tree;
};
