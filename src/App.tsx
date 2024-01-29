import { Header } from 'components/Header/Header';
import { Tree } from 'components/Tree/Tree';
import { useDecisionTree } from 'hooks';
import { useMemo, useState } from 'react';
import { loadTree } from 'services/config/config';
import { jsonDummyTree } from 'services/config/jsonDummyTree';

/**
 * App - responsible for rendering the decision tree
 * Future work - add a spinner, error handling, and a way to load a tree from (multiple) files
 * @constructor
 */
export default function App() {
  const [title] = useState<string>('Manifest Decision Tree');
  const decisionTree = useMemo(() => loadTree(jsonDummyTree), []);
  const { nodes, edges, onClick } = useDecisionTree(decisionTree);

  if (!nodes || !edges || nodes.length === 0 || edges.length === 0) return <div>Loading...</div>;

  return (
    <>
      <Header treeTitle={title} />
      <Tree nodes={nodes} edges={edges} onClick={onClick} />
    </>
  );
}
