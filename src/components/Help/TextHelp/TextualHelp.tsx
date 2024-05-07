import React from 'react';

interface HelpContentProps {
  content?: string;
}

/**
 * Renders the textual help content
 * @constructor
 */
export const TextualHelp = ({ content }: HelpContentProps) => {
  return (
    <div data-testid={'help-content'} className="max-h-full whitespace-pre-line text-lg">
      {content ? (
        <p className="text-black">{content}</p>
      ) : (
        <p className="text-black">Help content is unavailable.</p>
      )}
    </div>
  );
};
