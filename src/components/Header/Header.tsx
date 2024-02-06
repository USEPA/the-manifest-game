import { DagDirection } from 'store/DagSlice/dagSlice';
import styles from './header.module.css';

interface HeaderProps {
  treeTitle: string;
  direction: DagDirection;
  setDirection: (direction: DagDirection) => void;
}

export const Header = ({ treeTitle, setDirection, direction }: HeaderProps) => {
  const isHorizontal = direction === 'LR';

  const toggleDirection = () => {
    setDirection(direction === 'TB' ? 'LR' : 'TB');
  };

  return (
    <>
      <div className={styles.treeHeader}>
        <div className={styles.headerBanner}>
          <h1>{treeTitle}</h1>
          <div>
            <button
              aria-label={`use ${isHorizontal ? 'vertical' : 'horizontal'} layout`}
              onClick={toggleDirection}
            >
              T
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
