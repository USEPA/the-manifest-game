import defaultTree from '/default.json?url';
import { ErrorMsg } from '@/components/Error';
import { Header } from '@/components/Header/Header';
import { OffCanvas } from '@/components/OffCanvas/OffCanvas';
import { Spinner } from '@/components/Spinner/Spinner';
import { Tree } from '@/components/Tree/Tree';
import { useDecisionTree, useFetchConfig, useHelp, useUrl } from '@/hooks';
import { useEffect } from 'react';

/**
 * App - responsible for rendering the decision tree
 * @constructor
 */
export default function App() {
  const title = import.meta.env.VITE_APP_TITLE ?? 'The Manifest Decision Tree';
  const { config, isLoading: configIsLoading, error: configError } = useFetchConfig(defaultTree);
  const { pathParam, treeParam, setTreeParam } = useUrl();
  const { nodes, edges } = useDecisionTree(config, pathParam);
  const { helpIsOpen, hideHelp } = useHelp();

  useEffect(() => {
    if (!treeParam) {
      setTreeParam('0');
    }
  }, [treeParam, setTreeParam]);

  return (
    <>
      <Header treeTitle={title} />
      {configIsLoading ? (
        <Spinner />
      ) : configError ? (
        <ErrorMsg message={'Error parsing the Decision Tree'} />
      ) : (
        <Tree nodes={nodes} edges={edges} />
      )}
      <OffCanvas isOpen={helpIsOpen} onClose={hideHelp} />
    </>
  );
}
