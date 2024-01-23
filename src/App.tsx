import { Tree } from 'components/Tree/Tree';

import useTreeStore from 'store/treeStore';

export default function App() {
  const nodes = useTreeStore((state) => state.nodes);
  console.log(nodes);
  return <Tree />;
}
