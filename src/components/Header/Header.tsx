import { HelpIcon } from 'components/Help/HelpIcon/HelpIcon';
import { useHelp } from 'hooks';
import React, { MouseEventHandler } from 'react';
import { Panel } from 'reactflow';

interface HeaderProps {
  treeTitle: string;
}

export const Header = ({ treeTitle }: HeaderProps) => {
  const issueUrl = import.meta.env.VITE_ISSUE_URL;
  const { showHelp } = useHelp();

  const showInstructions: MouseEventHandler = (event) => {
    try {
      showHelp('guide.html');
      event.stopPropagation();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Panel position="top-left" className="sm:w-5/12 md:w-4/12 lg:w-3/12">
      <div className="box-border w-full rounded-xl bg-gradient-to-b from-sky-700 to-sky-900 p-2 align-middle">
        <div className="flex min-w-60 justify-between">
          <h1 className="text-xl font-semibold text-white">{treeTitle}</h1>
          <div className="absolute right-3 top-3">
            <HelpIcon onClick={showInstructions} size={20} />
          </div>
        </div>
        {issueUrl && (
          <div>
            <a href={issueUrl} className="text-sm underline decoration-1">
              Feedback/Report and Issue
            </a>
          </div>
        )}
      </div>
    </Panel>
  );
};
