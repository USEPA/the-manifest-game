import { TextualHelp } from 'components/Help/HelpContent/TextualHelp';
import { Spinner } from 'components/Spinner/Spinner';
import { useFetchHelp } from 'hooks';
import { useHelp } from 'hooks/useHelp/useHelp';
import React from 'react';

/**
 * Responsible for retrieving, and displaying information to help users made decisions
 * @constructor
 */
export const Help = () => {
  const { helpContentId } = useHelp();
  const { help, error, isLoading } = useFetchHelp(helpContentId);

  if (helpContentId === undefined || error) {
    return <p>There was a problem fetching help.</p>;
  }

  if (isLoading) {
    return <Spinner testId={'helpSpinner'} />;
  }

  return (
    <>
      <h2 className="text-xl font-semibold text-black">More Information</h2>
      <TextualHelp help={help} />
    </>
  );
};
