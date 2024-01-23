import { dummyManifestTree } from 'components/Tree/nodes';
import { Tree } from 'components/Tree/Tree';

import useTreeStore from 'store/treeStore';

export default function App() {
  const loadNodes = useTreeStore((state) => state.setNodes);
  loadNodes(dummyManifestTree);
  return <Tree />;
}
