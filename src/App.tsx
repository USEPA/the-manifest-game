import { Header } from 'components/Header/Header';
import { Spinner } from 'components/Spinner/Spinner';
import { Tree } from 'components/Tree/Tree';
import { useDecisionTree } from 'hooks';
import { useFetchConfig } from 'hooks/useFetchConfig/useFetchConfig';
import { useTreeDirection } from 'hooks/useTreeDirection/useTreeDirection';

/**
 * App - responsible for rendering the decision tree
 * @constructor
 */
export default function App() {
  const title = import.meta.env.VITE_APP_TITLE ?? 'The Manifest Game';
  const { config, isLoading, error } = useFetchConfig('/default.json');
  const [direction, setDirection] = useTreeDirection();
  const { nodes, edges, onClick } = useDecisionTree(config);

  if (isLoading || !config) return <Spinner />;

  if (error || (!config && !isLoading)) throw new Error('Failed to fetch config');

  return (
    <>
      <Header treeTitle={title} direction={direction} setDirection={setDirection} />
      <Tree nodes={nodes} edges={edges} onClick={onClick} />
    </>
  );
}
