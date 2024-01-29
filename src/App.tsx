import { Header } from 'components/Header/Header';
import { Tree } from 'components/Tree/Tree';
import { useFetchConfig } from 'hooks/useFetchConfig/useFetchConfig';
import { useState } from 'react';

/**
 * App - responsible for rendering the decision tree
 * Future work - add a spinner, error handling, and a way to load a tree from (multiple) files
 * @constructor
 */
export default function App() {
  const [title] = useState<string>('Manifest Decision Tree');
  const { tree, isLoading, error } = useFetchConfig('/submit-manifest.json');

  if (isLoading) return <p>loading...</p>;

  if (error || (!tree && !isLoading)) return <p>error</p>;

  if (!tree) return null;

  return (
    <>
      <Header treeTitle={title} />
      <Tree tree={tree} />
    </>
  );
}
