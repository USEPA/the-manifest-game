import { LayoutBtn } from 'components/Tree/ControlCenter/Controls/LayoutBtn/LayoutBtn';
import { MiniMapBtn } from 'components/Tree/ControlCenter/Controls/MiniMapBtn/MiniMapBtn';
import { Controls } from 'reactflow';
import { TreeDirection } from 'store';

export interface ControlCenterProps {
  mapVisible: boolean;
  setMapVisible: (visible: boolean) => void;
  direction: TreeDirection;
  setDirection: (direction: TreeDirection) => void;
}

/** The Controls for the Decision Tree*/
export const ControlCenter = ({
  mapVisible,
  setMapVisible,
  direction,
  setDirection,
}: ControlCenterProps) => {
  const toggleMap = () => {
    setMapVisible(!mapVisible);
  };
  const isHorizontal = direction === 'LR';

  const toggleDirection = () => {
    setDirection(direction === 'TB' ? 'LR' : 'TB');
  };

  return (
    <div data-testid="controlCenter">
      <Controls showInteractive={false}>
        <MiniMapBtn visible={mapVisible} onClick={toggleMap} />
        <LayoutBtn isHorizontal={isHorizontal} toggleDirection={toggleDirection} />
      </Controls>
    </div>
  );
};
