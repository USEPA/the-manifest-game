import { useEffect } from 'react';
import { ManifestNode } from 'services/tree/treeService';
import { DecisionTree, useTreeStore } from 'store';

const treeToNodes = (tree: DecisionTree): Array<ManifestNode> => {
  return Object.values(tree).map((node, index) => ({
    id: node.id,
    data: node.data,
    type: node.type ?? 'default',
    hidden: index !== 0,
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

  return {
    nodes,
    tree,
  } as const;
};
