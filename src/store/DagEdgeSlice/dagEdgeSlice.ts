import { applyEdgeChanges, Edge, EdgeChange, OnEdgesChange } from 'reactflow';
import { StateCreator } from 'zustand';

interface DagEdgeSliceState {
  dagEdges: Edge[];
}

interface DagEdgeSliceActions {
  /** Used to apply update to existing edges - used by the react-flow library*/
  onEdgesChange: OnEdgesChange;
}

export interface DagEdgeSlice extends DagEdgeSliceState, DagEdgeSliceActions {}

export const createDagEdgeSlice: StateCreator<
  DagEdgeSlice,
  [['zustand/devtools', never]],
  [],
  DagEdgeSlice
> = (set, get) => ({
  dagEdges: [],
  onEdgesChange: (changes: EdgeChange[]) => {
    set(
      {
        dagEdges: applyEdgeChanges(changes, get().dagEdges),
      },
      false,
      'onEdgesChange'
    );
  },
});
