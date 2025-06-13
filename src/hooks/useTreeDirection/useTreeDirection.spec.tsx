import '@testing-library/jest-dom';
import { useTreeDirection } from '@/hooks/useTreeDirection/useTreeDirection';
import { TreeDirection, useTreeStore } from '@/store';
import { ORIENTATION } from '@/store/TreeSlice/treeSlice';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';

afterEach(() => {
  cleanup();
  useTreeStore.setState({});
});
beforeEach(() => {
  useTreeStore.setState({
    direction: ORIENTATION.topToBottom,
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
      <button onClick={() => setDirection(newDir || ORIENTATION.leftToRight)}>set direction</button>
    </>
  );
};

describe('useTreeDirection', () => {
  test('returns the current direction', () => {
    render(<TestComponent initialDir={ORIENTATION.topToBottom} />);
    expect(screen.getByText(ORIENTATION.topToBottom)).toBeInTheDocument();
  });
  test('sets the tree direction', async () => {
    const user = userEvent.setup();
    render(<TestComponent initialDir={ORIENTATION.topToBottom} newDir={ORIENTATION.leftToRight} />);
    const button = screen.getByText('set direction');
    await user.click(button);
    expect(screen.queryByText(ORIENTATION.leftToRight)).toBeInTheDocument();
  });
  test('exposes a boolean that indicates whether the tree layout is horizontal', async () => {
    const user = userEvent.setup();
    render(<TestComponent initialDir={ORIENTATION.leftToRight} newDir={ORIENTATION.topToBottom} />);
    expect(screen.queryByText('horizontal')).toBeInTheDocument();
    await user.click(screen.getByText('set direction'));
    expect(screen.queryByText('vertical')).toBeInTheDocument();
  });
});
