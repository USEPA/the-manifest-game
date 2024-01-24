import { useEffect } from 'react';
import { buildTreeEdges } from 'services/tree/treeService';
import { DecisionTree, useTreeStore } from 'store';

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
