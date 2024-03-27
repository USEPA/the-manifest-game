import defaultTree from '/default.json?url';
import { BackgroundImage } from 'components/Background/BackgroundImage';
import { ErrorMsg } from 'components/Error';
import { Header } from 'components/Header/Header';
import { OffCanvas } from 'components/OffCanvas/OffCanvas';
import { Spinner } from 'components/Spinner/Spinner';
import { Tree } from 'components/Tree/Tree';
import { useDecisionTree } from 'hooks';
import { useFetchConfig } from 'hooks/useFetchConfig/useFetchConfig';
import { useHelp } from 'hooks/useHelp/useHelp';

/**
 * App - responsible for rendering the decision tree
 * @constructor
 */
export default function App() {
  const title = import.meta.env.VITE_APP_TITLE ?? 'The Manifest Game';
  const { config, isLoading: configIsLoading, error: configError } = useFetchConfig(defaultTree);
  const { nodes, edges } = useDecisionTree(config);
  const { helpIsOpen, hideHelp } = useHelp();

  const handleHelpClose = () => {
    hideHelp();
  };

  return (
    <>
      <BackgroundImage />
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
      <OffCanvas isOpen={helpIsOpen} handleClose={handleHelpClose} />
    </>
  );
}
