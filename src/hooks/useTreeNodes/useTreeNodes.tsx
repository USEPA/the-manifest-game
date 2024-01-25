import { useEffect } from 'react';
import { DecisionTree, DecisionTreeNode, useTreeStore } from 'store';
import { getRecursiveChildrenIds } from 'store/treeStore';

const treeToNodes = (tree: DecisionTree): Array<DecisionTreeNode> => {
  return Object.values(tree).map((node) => ({
    id: node.id,
    data: node.data,
    type: node.type ?? 'default',
    hidden: node.hidden,
    connectable: false,
    draggable: false,
    position: { x: 0, y: 0 }, // position is set by our layout library, this is a dummy value
  }));
};

export const useTreeNodes = (initialTree?: DecisionTree) => {
  const { nodes, tree, setTree, setNodes, onNodesChange, onConnect } = useTreeStore(
    (state) => state
  );

  const showNode = ({ nodeId, hide = false }: { nodeId: string; hide: boolean }) => {
    const newTree = { ...tree };
    newTree[nodeId].hidden = hide;
    if (hide) {
      const childrenIds = getRecursiveChildrenIds(tree, nodeId);
      childrenIds.forEach((id: string) => {
        newTree[id].hidden = true;
      });
    }
    setTree(newTree);
  };

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
    onConnect,
    onNodesChange,
    showNode,
  } as const;
};
