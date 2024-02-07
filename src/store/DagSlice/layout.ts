import dagre from '@dagrejs/dagre';
import { Edge } from 'reactflow';
import { DagDirection, DecisionTree, PositionUnawareDecisionTree } from 'store/DagSlice/dagSlice';
import { createDagEdge } from 'store/DagSlice/dagUtils';

const dagreGraph = new dagre.graphlib.Graph<{
  x: number;
  y: number;
  width: number;
  height: number;
  rank: number;
}>();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const defaultNodeWidth = 400;
const defaultNodeHeight = 150;
const boolNodeWidth = defaultNodeWidth + 50;
const boolNodeHeight = defaultNodeHeight + 50;

/** Accepts an object of position unaware nodes, builds a temporary tree
 * and returns an object of position aware nodes
 *
 * This was initially pulled from the reactflow documentation
 * https://reactflow.dev/learn/layouting/layouting
 */
export const buildPositionedTree = (
  tree?: PositionUnawareDecisionTree,
  direction: DagDirection = 'TB'
): DecisionTree => {
  if (!tree) return {};
  dagreGraph.setGraph({ rankdir: direction });

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
        x: position.x - defaultNodeWidth / 2,
        y: position.y - defaultNodeHeight / 2,
        rank: position.rank,
      },
    };
    console.log(decisionTree[node.id].position);
  });

  return decisionTree;
};
