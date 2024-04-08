import { Panel } from 'reactflow';

interface HeaderProps {
  treeTitle: string;
}

export const Header = ({ treeTitle }: HeaderProps) => {
  const issueUrl = import.meta.env.VITE_ISSUE_URL;

  return (
    <Panel position="top-left" className="w-3/12">
      <div className="box-border w-full rounded-xl bg-gradient-to-b from-sky-700 to-sky-900 p-2 align-middle">
        <div>
          <h1 className="text-xl font-semibold text-white">{treeTitle}</h1>
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
