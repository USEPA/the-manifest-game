import { useEffect } from 'react';
import { DecisionTree, useTreeStore } from 'store';
import { buildTreeEdges } from 'store/treeStore';

export const useTreeEdges = (initialTree: DecisionTree) => {
  const { edges, setEdges } = useTreeStore((state) => state);

  useEffect(() => {
    setEdges(buildTreeEdges(initialTree));
  }, [initialTree, setEdges]);

  return {
    edges,
    setEdges,
  } as const;
};
