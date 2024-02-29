import { LuMoveHorizontal, LuMoveVertical } from 'react-icons/lu';
import { ControlButton } from 'reactflow';

interface LayoutBtnProps {
  isHorizontal: boolean;
  toggleDirection: () => void;
}

/** LayoutBtn toggles the layout direction of the tree.*/
export const LayoutBtn = ({ isHorizontal, toggleDirection }: LayoutBtnProps) => {
  return (
    <ControlButton
      aria-label={`switch to ${isHorizontal ? 'vertical' : 'horizontal'} layout`}
      onClick={toggleDirection}
    >
      {isHorizontal ? <LuMoveVertical color={'000'} /> : <LuMoveHorizontal color={'000'} />}
    </ControlButton>
  );
};
