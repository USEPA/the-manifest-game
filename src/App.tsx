import { Tree } from 'components/Tree/Tree';
import { useDecisionTree } from 'hooks';
import { useMemo } from 'react';
import { loadTree } from 'services/config/config';
import { jsonDummyTree } from 'services/config/jsonDummyTree';

export default function App() {
  const decisionTree = useMemo(() => loadTree(jsonDummyTree), []);
  const { nodes, edges, onClick, onNodesChange, onEdgesChange, onConnect } =
    useDecisionTree(decisionTree);

  if (!nodes || !edges || nodes.length === 0 || edges.length === 0) return <div>Loading...</div>;

  return (
    <Tree
      nodes={nodes}
      edges={edges}
      onClick={onClick}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
    />
  );
}
