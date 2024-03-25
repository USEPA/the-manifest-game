import defaultTree from '/default.json?url';
import { ErrorMsg } from 'components/Error';
import { Header } from 'components/Header/Header';
import { OffCanvas } from 'components/SideBar/OffCanvas';
import { Spinner } from 'components/Spinner/Spinner';
import { Tree } from 'components/Tree/Tree';
import { useDecisionTree } from 'hooks';
import { useFetchConfig } from 'hooks/useFetchConfig/useFetchConfig';
import { useState } from 'react';

/**
 * App - responsible for rendering the decision tree
 * @constructor
 */
export default function App() {
  const title = import.meta.env.VITE_APP_TITLE ?? 'The Manifest Game';
  const { config, isLoading: configIsLoading, error: configError } = useFetchConfig(defaultTree);
  const { nodes, edges } = useDecisionTree(config);
  const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(true);

  return (
    <>
      <Header treeTitle={title} />
      {configIsLoading ? (
        <Spinner />
      ) : configError ? (
        <ErrorMsg message={'Error parsing the Decision Tree'} />
      ) : (
        <>
          <Tree nodes={nodes} edges={edges} />
        </>
      )}
      <OffCanvas isOpen={isOffCanvasOpen} />
    </>
  );
}
