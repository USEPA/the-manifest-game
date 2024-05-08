import { useCallback, useMemo } from 'react';
import useTreeStore from 'store';
import { Decision, DecisionPath } from 'store/TreeSlice/treeSlice';

export interface UsesPathReturn {
  path: DecisionPath;
  decisionIsInPath: (id: string) => boolean;
  getDecision: (id: string) => Decision | undefined;
  isCurrentDecision: boolean;
}

/**
 * custom hook for interacting with the path taken through the decision tree
 */
export const useDecisions = (id?: string) => {
  const { path } = useTreeStore((state) => state);

  const decisionIsInPath = useCallback(
    (id: string) => path.some((decision) => decision.nodeId === id),
    [path]
  );

  const getDecision = useCallback(
    (id: string) => path.find((decision) => decision.nodeId === id),
    [path]
  );

  const isCurrentDecision = useMemo(() => {
    if (!path || path.length === 0) return false;
    return id === path[path.length - 1].selected;
  }, [path, id]);

  return {
    path,
    decisionIsInPath,
    getDecision,
    isCurrentDecision,
  } as UsesPathReturn;
};
