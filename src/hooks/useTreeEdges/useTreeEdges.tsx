import { useEffect } from 'react';
import useStore, { buildTreeEdges, DecisionTree } from 'store';

export const useTreeEdges = (initialTree: DecisionTree) => {
  const { edges, setEdges } = useStore((state) => state);

  useEffect(() => {
    setEdges(buildTreeEdges(initialTree));
  }, [initialTree, setEdges]);

  return {
    edges,
    setEdges,
  } as const;
};
