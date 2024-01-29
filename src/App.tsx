import { ErrorBoundary } from 'components/Error/ErrorBoundary';
import { ErrorMsg } from 'components/Error/ErrorMsg';
import { Header } from 'components/Header/Header';
import { Spinner } from 'components/Spinner/Spinner';
import { Tree } from 'components/Tree/Tree';
import { useFetchConfig } from 'hooks/useFetchConfig/useFetchConfig';
import { useState } from 'react';

/**
 * App - responsible for rendering the decision tree
 * Future work - add a spinner, error handling, and a way to load a tree from (multiple) files
 * @constructor
 */
export default function App() {
  const [title] = useState<string>('The Manifest Game');
  const { tree, isLoading, error } = useFetchConfig('/default.json');

  if (isLoading || !tree) return <Spinner />;

  if (error || (!tree && !isLoading)) return <p>error</p>;

  return (
    <>
      <ErrorBoundary fallback={<ErrorMsg />}>
        <Header treeTitle={title} />
        <Tree tree={tree} />
      </ErrorBoundary>
    </>
  );
}
