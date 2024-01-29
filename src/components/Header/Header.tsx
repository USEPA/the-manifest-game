import './Header.css';

interface HeaderProps {
  treeTitle: string;
}

export const Header = ({ treeTitle }: HeaderProps) => {
  return (
    <>
      <div className="decision-tree-header">
        <h1>{treeTitle}</h1>
      </div>
    </>
  );
};
