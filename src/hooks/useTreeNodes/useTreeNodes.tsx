import { useEffect } from 'react';
import { ManifestNode } from 'services/tree/treeService';
import { DecisionTree, useTreeStore } from 'store/treeStore';

const decisionTreeToNodes = (tree: DecisionTree): Array<ManifestNode> => {
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
  const { nodes, decisionTree: tree, setDecisionTree, setNodes } = useTreeStore((state) => state);

  useEffect(() => {
    if (initialTree) {
      setNodes(decisionTreeToNodes(initialTree));
      setDecisionTree(initialTree);
    }
  }, []);

  return {
    nodes,
    tree,
  } as const;
};
