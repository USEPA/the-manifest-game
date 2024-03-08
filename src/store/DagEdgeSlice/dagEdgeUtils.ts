import { Edge, MarkerType } from 'reactflow';

export interface DagEdgeConfig {
  source: string;
  target: string;
}

/** idempotent action to add an edge */
export const addDagEdge = (currentEdges: Edge[], config: DagEdgeConfig) => {
  if (currentEdges.find((e) => e.source === config.source && e.target === config.target)) {
    return currentEdges;
  }
  return [...currentEdges, createDagEdge(config.source, config.target)];
};

/** creates the edges between two nodes with defaults applied */
export const createDagEdge = (source: string, target: string): Edge => {
  return {
    id: `${source}-${target}`,
    hidden: false,
    source,
    target,
    type: 'smoothstep',
    markerEnd: { type: MarkerType.ArrowClosed },
  };
};
