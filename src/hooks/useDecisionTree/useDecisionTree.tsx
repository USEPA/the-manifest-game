import { useTreeEdges } from 'hooks/useTreeEdges/useTreeEdges';
import { useTreeNodes } from 'hooks/useTreeNodes/useTreeNodes';
import { NodeMouseHandler } from 'reactflow';
import { DecisionTree, setHiddenEdges } from 'store';
import { getRecursiveChildrenIds } from 'store/treeStore';

/**
 * useManifestTree
 *
 * logic and interface for managing the interactive e-Manifest decision tree
 * returns an array of nodes to be used with the React Flow library and getter/setter functions
 * @param initialTree
 */
export const useDecisionTree = (initialTree: DecisionTree) => {
  const { nodes, tree, setTree, onNodesChange, onConnect } = useTreeNodes(initialTree);
  const { edges, setEdges, onEdgesChange } = useTreeEdges(initialTree);

  const onClick: NodeMouseHandler = (event, node) => {
    console.log('node clicked', node);
    const { data } = node;
    if (!data.expanded) {
      const childrenIds = data.children;
      const newTree = { ...tree };
      newTree[node.id] = { ...node, data: { ...data, expanded: true } };
      childrenIds.forEach((id: string) => {
        newTree[id].hidden = false;
      });
      setTree(newTree);
      setEdges(
        setHiddenEdges({
          edges,
          targetNodeIds: childrenIds,
          hidden: false,
        })
      );
    } else {
      const childrenIds = getRecursiveChildrenIds(tree, node.id);
      const newTree = { ...tree };
      newTree[node.id] = { ...node, data: { ...data, expanded: false } };
      childrenIds.forEach((id: string) => {
        newTree[id].hidden = true;
      });
      setTree(newTree);
      setEdges(
        setHiddenEdges({
          edges,
          targetNodeIds: childrenIds,
          hidden: true,
        })
      );
    }
  };

  return {
    nodes,
    edges,
    onClick,
    onConnect,
    onNodesChange,
    onEdgesChange,
  } as const;
};
