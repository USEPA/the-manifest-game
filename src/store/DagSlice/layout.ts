import dagre from '@dagrejs/dagre';
import { Edge } from 'reactflow';
import { DecisionTree, PositionUnawareDecisionTree } from 'store/DagSlice/dagSlice';
import { createDagEdge } from 'store/DagSlice/dagUtils';

const dagreGraph = new dagre.graphlib.Graph<{
  x: number;
  y: number;
  width: number;
  height: number;
  rank: number;
}>();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const defaultNodeWidth = 200;
const defaultNodeHeight = 150;
const boolNodeWidth = defaultNodeWidth + 50;
const boolNodeHeight = defaultNodeHeight + 50;
const shiftYForHeader = 100;
const shiftOffEdge = 50;

/** Accepts an object of position unaware nodes, builds a temporary tree
 * and returns an object of position aware nodes
 *
 * This was initially pulled from the reactflow documentation
 * https://reactflow.dev/learn/layouting/layouting
 */
export const buildPositionedTree = (tree: PositionUnawareDecisionTree): DecisionTree => {
  dagreGraph.setGraph({ rankdir: 'TB' });

  // build edges
  const edges: Edge[] = [];
  Object.values(tree).forEach((node) => {
    if (node.data.children && node.data.children.length > 0) {
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

  const decisionTree: DecisionTree = {};

  Object.values(tree).forEach((node) => {
    const position = dagreGraph.node(node.id);
    decisionTree[node.id] = {
      ...node,
      position: {
        x: position.x - defaultNodeWidth / 2 + shiftOffEdge,
        y: position.y - defaultNodeHeight / 2 + shiftYForHeader,
        rank: position.rank,
      },
    };
  });

  return decisionTree;
};
