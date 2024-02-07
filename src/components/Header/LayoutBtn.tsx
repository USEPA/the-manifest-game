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
      {isHorizontal ? <span>&#8597;</span> : <span>&harr;</span>}
    </button>
  );
};
