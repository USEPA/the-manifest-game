import dagre from '@dagrejs/dagre';
import { Edge, Node } from 'reactflow';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const defaultNodeWidth = 175;
const defaultNodeHeight = 50;
const boolNodeWidth = defaultNodeWidth + 50;
const boolNodeHeight = defaultNodeHeight + 50;

/** Apply positioning through implementing a Directed Acyclic Graph (DAG) */
export const getLayoutElements = (nodes: Array<Node>, edges: Array<Edge>) => {
  dagreGraph.setGraph({ rankdir: 'TB' });

  nodes.forEach((node) => {
    const nodeHeight = node.type === 'BoolNode' ? boolNodeHeight : defaultNodeHeight;
    const nodeWidth = node.type === 'BoolNode' ? boolNodeWidth : defaultNodeWidth;
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);

    node.position = {
      x: nodeWithPosition.x - defaultNodeWidth / 2,
      y: nodeWithPosition.y - defaultNodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};
