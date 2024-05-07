import { HtmlHelp } from 'components/Help/HtmlHelp/HtmlHelp';
import { TextualHelp } from 'components/Help/TextHelp/TextualHelp';
import { Spinner } from 'components/Spinner/Spinner';
import { useFetchHelp } from 'hooks';
import { useHelp } from 'hooks/useHelp/useHelp';
import React from 'react';

export interface TextContent {
  type: 'text';
  content: string;
}

export interface HtmlContent {
  type: 'html';
  content: HTMLElement;
}

export type HelpContent = TextContent | HtmlContent;

/**
 * Responsible for retrieving, and displaying information to help users made decisions
 * @constructor
 */
export const Help = () => {
  const { contentFilename } = useHelp();
  const { help, error, isLoading } = useFetchHelp(contentFilename);

  if (contentFilename === undefined || error) {
    return <p>There was a problem fetching help.</p>;
  }

  if (isLoading) {
    return <Spinner testId={'helpSpinner'} />;
  }

  return (
    <>
      <h2 className="text-xl font-semibold text-black">More Information</h2>
      {help?.type === 'text' && <TextualHelp content={help.content} />}
      {help?.type === 'html' && <HtmlHelp html={help.content} />}
    </>
  );
};
