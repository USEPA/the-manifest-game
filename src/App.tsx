import { Tree } from 'components/Tree/Tree';
import { useDecisionTree } from 'hooks';
import { loadTree } from 'services/config/config';
import { jsonDummyTree } from 'services/config/jsonDummyTree';

export default function App() {
  const { nodes, edges, onClick } = useDecisionTree(loadTree(jsonDummyTree));

  if (!nodes || !edges || nodes.length === 0 || edges.length === 0) return <div>Loading...</div>;

  return <Tree nodes={nodes} edges={edges} onClick={onClick} />;
}
