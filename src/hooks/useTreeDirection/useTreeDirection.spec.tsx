import '@testing-library/jest-dom';
import { useTreeDirection } from '@/hooks/useTreeDirection/useTreeDirection';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import useTreeStore, { TreeDirection } from '@/store';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';

afterEach(() => {
  cleanup();
  useTreeStore.setState({});
});
beforeEach(() => {
  useTreeStore.setState({
    direction: 'TB',
    tree: {
      '1': {
        id: '1',
        position: { x: 0, y: 0 },
        data: {
          label: 'foo',
          children: [],
        },
      },
    },
  });
});

const TestComponent = ({
  initialDir,
  newDir,
}: {
  initialDir?: TreeDirection;
  newDir?: TreeDirection;
}) => {
  const [direction, setDirection, isHorizontal] = useTreeDirection(initialDir);
  return (
    <>
      <p>{direction}</p>
      <p>{isHorizontal ? 'horizontal' : 'vertical'}</p>
      <button onClick={() => setDirection(newDir || 'LR')}>set direction</button>
    </>
  );
};

describe('useTreeDirection', () => {
  test('returns the current direction', () => {
    render(<TestComponent initialDir={'TB'} />);
    expect(screen.getByText('TB')).toBeInTheDocument();
  });
  test('sets the tree direction', async () => {
    const user = userEvent.setup();
    render(<TestComponent initialDir={'TB'} newDir={'LR'} />);
    const button = screen.getByText('set direction');
    await user.click(button);
    expect(screen.queryByText('LR')).toBeInTheDocument();
  });
  test('exposes a boolean that indicates whether the tree layout is horizontal', async () => {
    const user = userEvent.setup();
    render(<TestComponent initialDir={'LR'} newDir={'TB'} />);
    expect(screen.queryByText('horizontal')).toBeInTheDocument();
    await user.click(screen.getByText('set direction'));
    expect(screen.queryByText('vertical')).toBeInTheDocument();
  });
});
