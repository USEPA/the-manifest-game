import { DecisionEdgeData } from 'components/Tree/Edges/DecisionEdge/DecisionEdge';
import { applyEdgeChanges, Edge, EdgeChange, OnEdgesChange } from 'reactflow';
import { addDagEdge } from 'store/DagEdgeSlice/dagEdgeUtils';
import { StateCreator } from 'zustand';

interface DagEdgeSliceState {
  dagEdges: Edge<DecisionEdgeData>[];
}

interface DagEdgeSliceActions {
  /** Used to apply update to existing edges - used by the react-flow library*/
  onEdgesChange: OnEdgesChange;
  /** Removes edges from our store*/
  removeEdgesByTarget: (nodeIds: string[]) => void;
  /** Create an edge */
  createEdge: (sourceId?: string, targetId?: string) => void;
  /** Mark an edge as decision made by source */
  addEdgeToPath: (source: string, target: string) => void;
  /** Remove an edge from the path by source */
  removeEdgeFromPathBySource: (source: string) => void;
}

export interface DagEdgeSlice extends DagEdgeSliceState, DagEdgeSliceActions {}

export const createDagEdgeSlice: StateCreator<
  DagEdgeSlice,
  [['zustand/devtools', never]],
  [],
  DagEdgeSlice
> = (set, get) => ({
  dagEdges: [],
  /* v8 ignore next 9  - this is something needed by the React flow library, not tested by us*/
  onEdgesChange: (changes: EdgeChange[]) => {
    set(
      {
        dagEdges: applyEdgeChanges(changes, get().dagEdges),
      },
      false,
      'onEdgesChange'
    );
  },
  removeEdgesByTarget: (nodeIds: string[]) => {
    set(
      {
        dagEdges: get().dagEdges.filter((edge) => !nodeIds.includes(edge.target)),
      },
      false,
      'removeEdgesByTarget'
    );
  },
  createEdge: (sourceId?: string, targetId?: string) => {
    if (!sourceId || !targetId) return undefined;
    const newEdges = addDagEdge(get().dagEdges, { source: sourceId, target: targetId });
    set(
      {
        dagEdges: newEdges,
      },
      false,
      'createEdge'
    );
  },
  removeEdgeFromPathBySource: (source: string) => {
    const newEdges = get().dagEdges.map((edge) => {
      if (edge.source === source) {
        edge.data = { decisionMade: false };
      }
      return edge;
    });
    set(
      {
        dagEdges: newEdges,
      },
      false,
      'removeEdgeFromPathBySource'
    );
  },
  addEdgeToPath: (source: string, target: string) => {
    const newEdges = get().dagEdges.map((edge) => {
      if (edge.source === source && edge.target === target) {
        edge.style = { stroke: '#05b485', strokeWidth: '3px' };
        edge.data = { decisionMade: true };
      }
      return edge;
    });
    set(
      {
        dagEdges: newEdges,
      },
      false,
      'markEdgeAsDecisionMade'
    );
  },
});
