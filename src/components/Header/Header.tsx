import { LayoutBtn } from 'components/Header/Controls/LayoutBtn/LayoutBtn';
import { MiniMapBtn } from 'components/Header/Controls/MiniMapBtn/MiniMapBtn';
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
          <div className={styles.headerControls}>
            <LayoutBtn isHorizontal={isHorizontal} toggleDirection={toggleDirection} />
            <MiniMapBtn visible={true} toggleMap={() => undefined} />
          </div>
        </div>
      </div>
    </>
  );
};
