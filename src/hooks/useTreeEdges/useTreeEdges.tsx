import { useEffect } from 'react';
import useStore, { buildTreeEdges, DecisionTree } from 'store';

export const useTreeEdges = (tree: DecisionTree) => {
  const { edges, setEdges } = useStore((state) => state);

  useEffect(() => {
    setEdges(buildTreeEdges(tree));
  }, [tree, setEdges]);

  return {
    edges,
    setEdges,
  } as const;
};
