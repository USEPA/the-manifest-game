import styles from './header.module.css';

interface HeaderProps {
  treeTitle: string;
}

export const Header = ({ treeTitle }: HeaderProps) => {
  return (
    <>
      <div className={styles.treeHeader}>
        <div className={styles.headerBanner}>
          <h1>{treeTitle}</h1>
        </div>
      </div>
    </>
  );
};
