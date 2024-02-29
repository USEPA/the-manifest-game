import { LuMapPin, LuMapPinOff } from 'react-icons/lu';
import { ControlButton } from 'reactflow';

interface MiniMapBtnProps {
  visible: boolean;
  onClick: () => void;
}

/** LayoutBtn toggles the layout direction of the tree.*/
export const MiniMapBtn = ({ visible, onClick }: MiniMapBtnProps) => {
  return (
    <ControlButton aria-label={`${visible ? 'hide minimap' : 'show minimap'}`} onClick={onClick}>
      {visible ? <LuMapPinOff color={'000'} /> : <LuMapPin color={'000'} />}
    </ControlButton>
  );
};
