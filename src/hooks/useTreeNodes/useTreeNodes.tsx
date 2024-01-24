import { useEffect } from 'react';
import { ManifestNode } from 'services/tree/treeService';
import { DecisionTree, useTreeStore } from 'store';

const treeToNodes = (tree: DecisionTree): Array<ManifestNode> => {
  return Object.values(tree).map((node) => ({
    id: node.id,
    data: node.data,
    type: node.type ?? 'default',
    hidden: node.hidden,
    connectable: false,
    draggable: false,
  }));
};

export const useTreeNodes = (initialTree?: DecisionTree) => {
  const { nodes, tree, setTree, setNodes } = useTreeStore((state) => state);

  useEffect(() => {
    if (initialTree) {
      setNodes(treeToNodes(initialTree));
      setTree(initialTree);
    }
  }, []);

  useEffect(() => {
    setNodes(treeToNodes(tree));
  }, [tree, setNodes]);

  return {
    nodes,
    setTree,
    tree,
  } as const;
};
