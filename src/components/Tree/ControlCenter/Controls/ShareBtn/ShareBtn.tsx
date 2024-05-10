import { LuShare } from 'react-icons/lu';
import { ControlButton } from 'reactflow';

/** Button to generate a shareable URL .*/
export const ShareBtn = () => {
  return (
    <ControlButton aria-label="share diagram" onClick={() => console.log('share')}>
      <LuShare className="font-bold" />
    </ControlButton>
  );
};
