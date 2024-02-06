import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useTreeDirection } from 'hooks/useTreeDirection/useTreeDirection';
import { DagDirection } from 'store/DagSlice/dagSlice';
import { afterEach, describe, expect, it } from 'vitest';

afterEach(() => cleanup());

const TestComponent = ({
  initialDir,
  newDir,
}: {
  initialDir?: DagDirection;
  newDir?: DagDirection;
}) => {
  const [direction, setDirection] = useTreeDirection(initialDir || 'TB');
  return (
    <>
      <p>{direction}</p>
      <button onClick={() => setDirection(newDir || 'LR')}>set direction</button>
    </>
  );
};

describe('useTreeDirection', () => {
  it('returns the current direction', () => {
    render(<TestComponent initialDir={'TB'} />);
    expect(screen.getByText('TB')).toBeInTheDocument();
  });
  it('sets the tree direction', async () => {
    render(<TestComponent initialDir={'TB'} newDir={'LR'} />);
    const button = screen.getByText('set direction');
    await userEvent.click(button);
    expect(screen.queryByText('LR')).toBeInTheDocument();
  });
});
