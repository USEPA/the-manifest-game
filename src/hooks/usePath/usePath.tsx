import { useCallback, useEffect } from 'react';
import useTreeStore from 'store';
import { Decision, DecisionPath } from 'store/TreeSlice/treeSlice';

export interface UsesPathReturn {
  path: DecisionPath;
  decisionIsInPath: (id: string) => boolean;
  getDecision: (id: string) => Decision | undefined;
}

/**
 * custom hook for interacting with the path taken through the decision tree
 */
export const usePath = (initialPath?: DecisionPath) => {
  const { path, setPath } = useTreeStore((state) => state);

  useEffect(() => {
    if (initialPath) {
      setPath(initialPath);
    }
  }, [setPath, initialPath]);

  const decisionIsInPath = useCallback(
    (id: string) => path.some((decision) => decision.nodeId === id),
    [path]
  );

  const getDecision = useCallback(
    (id: string) => path.find((decision) => decision.nodeId === id),
    [path]
  );

  return {
    path,
    decisionIsInPath,
    getDecision,
  } as UsesPathReturn;
};
