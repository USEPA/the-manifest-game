import { ErrorBoundary } from 'components/Error/ErrorBoundary';
import { ErrorMsg } from 'components/Error/ErrorMsg';
import { Header } from 'components/Header/Header';
import { Spinner } from 'components/Spinner/Spinner';
import { Tree } from 'components/Tree/Tree';
import { useFetchConfig } from 'hooks/useFetchConfig/useFetchConfig';

/**
 * App - responsible for rendering the decision tree
 * Future work - add a spinner, error handling, and a way to load a tree from (multiple) files
 * @constructor
 */
export default function App() {
  const title = import.meta.env.VITE_APP_TITLE ?? 'The Manifest Game';
  const { config, isLoading, error } = useFetchConfig('/default.json');

  if (isLoading || !config) return <Spinner />;

  if (error || (!config && !isLoading)) return <p>error</p>;

  return (
    <>
      <ErrorBoundary fallback={<ErrorMsg />}>
        <Header treeTitle={title} />
        <Tree tree={config} />
      </ErrorBoundary>
    </>
  );
}
