import { LuMoveHorizontal, LuMoveVertical } from 'react-icons/lu';
import styles from './layoutbtn.module.css';

interface LayoutBtnProps {
  isHorizontal: boolean;
  toggleDirection: () => void;
}

/** LayoutBtn toggles the layout direction of the tree.*/
export const LayoutBtn = ({ isHorizontal, toggleDirection }: LayoutBtnProps) => {
  return (
    <button
      className={styles.layoutBtn}
      aria-label={`switch to ${isHorizontal ? 'vertical' : 'horizontal'} layout`}
      onClick={toggleDirection}
    >
      {isHorizontal ? <LuMoveVertical /> : <LuMoveHorizontal />}
    </button>
  );
};
