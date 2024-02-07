import styles from 'components/Header/Controls/MiniMapBtn/minimapbtn.module.css';
import { LuMapPin, LuMapPinOff } from 'react-icons/lu';

interface MiniMapBtnProps {
  visible: boolean;
  toggleMap: () => void;
}

/** LayoutBtn toggles the layout direction of the tree.*/
export const MiniMapBtn = ({ visible, toggleMap }: MiniMapBtnProps) => {
  return (
    <button
      className={styles.miniMapBtn}
      aria-label={`${visible ? 'hide minimap' : 'show minimap'}`}
      onClick={toggleMap}
    >
      {visible ? <LuMapPinOff /> : <LuMapPin />}
    </button>
  );
};
