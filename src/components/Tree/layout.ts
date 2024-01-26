import dagre from '@dagrejs/dagre';
import { Edge, Node } from 'reactflow';
import { DagNode } from 'store';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const defaultNodeWidth = 175;
const defaultNodeHeight = 75;
const boolNodeWidth = defaultNodeWidth + 50;
const boolNodeHeight = defaultNodeHeight + 50;

/** Apply positioning through implementing a Directed Acyclic Graph (DAG)
 * This was pulled from the reactflow documentation
 * https://reactflow.dev/learn/layouting/layouting
 * */
export const getLayoutElements = (nodes: Array<DagNode>, edges: Array<Edge>) => {
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

  return { nodes, edges } as { nodes: Node[]; edges: Edge[] };
};
