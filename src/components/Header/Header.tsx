import { Panel } from 'reactflow';

interface HeaderProps {
  treeTitle: string;
}

export const Header = ({ treeTitle }: HeaderProps) => {
  return (
    <Panel position="top-left" className="w-3/12">
      <div className="box-border flex w-full justify-between rounded-xl bg-gradient-to-b from-sky-700 to-sky-900 p-2 align-middle">
        <h1 className="text-xl font-semibold text-white">{treeTitle}</h1>
      </div>
    </Panel>
  );
};
