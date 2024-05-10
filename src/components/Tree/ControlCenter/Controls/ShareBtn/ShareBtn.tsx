import { useUrl } from 'hooks/useUrl/useUrl';
import { LuShare } from 'react-icons/lu';
import { ControlButton } from 'reactflow';

/** Button to generate a shareable URL .*/
export const ShareBtn = () => {
  const { copyTreeUrlToClipboard } = useUrl();

  return (
    <ControlButton aria-label="share diagram" onClick={copyTreeUrlToClipboard}>
      <LuShare className="font-bold" />
    </ControlButton>
  );
};
