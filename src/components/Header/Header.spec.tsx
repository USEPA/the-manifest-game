import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DagDirection } from 'store/DagSlice/dagSlice';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Header } from './Header';

const TestComponent = ({
  title,
  setDirection,
  direction,
  mapVisible,
  setMapVisible,
}: {
  title?: string;
  setDirection?: (dir: DagDirection) => void;
  direction?: DagDirection;
  mapVisible?: boolean;
  setMapVisible?: (visible: boolean) => void;
}) => {
  return (
    <Header
      treeTitle={title ?? 'foo'}
      direction={direction ?? 'TB'}
      setDirection={setDirection ?? vi.fn()}
      mapVisible={mapVisible ?? true}
      setMapVisible={setMapVisible ?? vi.fn()}
    />
  );
};

describe('Header', () => {
  afterEach(() => cleanup());
  it('renders a title', () => {
    const title = 'hello';
    render(<TestComponent title={title} />);
    expect(screen.getByText(title)).toBeInTheDocument();
  });
  it('renders a layout toggle button', () => {
    render(<TestComponent />);
    expect(screen.getByRole('button', { name: /layout/i })).toBeInTheDocument();
  });
  it('toggles the layout direction', async () => {
    const user = userEvent.setup();
    const setDirection = vi.fn();
    const { rerender } = render(<TestComponent setDirection={setDirection} direction={'LR'} />);
    await user.click(screen.getByRole('button', { name: /layout/i }));
    expect(setDirection).toHaveBeenCalled();
    rerender(<TestComponent setDirection={setDirection} />);
    await user.click(screen.getByRole('button', { name: /layout/i }));
    expect(setDirection).toHaveBeenCalled();
  });
  it('renders a map toggle button', () => {
    render(<TestComponent />);
    expect(screen.getByRole('button', { name: /minimap/i })).toBeInTheDocument();
  });
  it('toggles the minimap visibility', async () => {
    const user = userEvent.setup();
    const setMapVisible = vi.fn();
    const { rerender } = render(<TestComponent mapVisible={true} setMapVisible={setMapVisible} />);
    await user.click(screen.getByRole('button', { name: /minimap/i }));
    expect(setMapVisible).toHaveBeenCalled();
    rerender(<TestComponent setMapVisible={setMapVisible} />);
    await user.click(screen.getByRole('button', { name: /minimap/i }));
    expect(setMapVisible).toHaveBeenCalled();
  });
});
