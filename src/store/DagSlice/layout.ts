import dagre from '@dagrejs/dagre';
import { Edge } from 'reactflow';
import { DagNode, TreeNode } from 'store/index';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const defaultNodeWidth = 200;
const defaultNodeHeight = 150;
const boolNodeWidth = defaultNodeWidth + 50;
const boolNodeHeight = defaultNodeHeight + 50;
const shiftYForHeader = 100;
const shiftOffEdge = 50;

/** Apply positioning through implementing a Directed Acyclic Graph (DAG)
 * This was pulled from the reactflow documentation
 * https://reactflow.dev/learn/layouting/layouting
 * */
export const getLayoutElements = (
  nodes: Array<TreeNode | DagNode>,
  edges: Array<Edge>
): {
  nodes: Array<DagNode>;
  edges: Array<Edge>;
} => {
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

  const dagNodes = nodes.map((node) => {
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

  return { nodes: dagNodes, edges } as { nodes: DagNode[]; edges: Edge[] };
};
