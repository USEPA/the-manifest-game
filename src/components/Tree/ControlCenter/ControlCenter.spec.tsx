import '@testing-library/jest-dom';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ControlCenter } from 'components/Tree/ControlCenter/index';
import { ReactFlowProvider } from 'reactflow';
import { TreeDirection } from 'store';
import { renderWithProviders } from 'test-utils';
import { afterEach, describe, expect, test, vi } from 'vitest';

interface TestComponentProps {
  mapVisible?: boolean;
  setMapVisible?: (visible: boolean) => void;
  direction?: TreeDirection;
  setDirection?: (direction: TreeDirection) => void;
}

const TestComponent = ({ ...props }: TestComponentProps) => {
  const dummyFunc = () => undefined;
  const mapVisible = props?.mapVisible ?? true;
  const onClick = props?.setMapVisible ?? dummyFunc;
  const setDirection = props?.setDirection ?? dummyFunc;
  const direction = props?.direction ?? 'TB';

  return (
    <ReactFlowProvider>
      <ControlCenter
        mapVisible={mapVisible}
        setMapVisible={onClick}
        direction={direction}
        setDirection={setDirection}
      />
    </ReactFlowProvider>
  );
};

afterEach(() => cleanup());

describe('ControlCenter', () => {
  test('renders', () => {
    renderWithProviders(<TestComponent />);
    expect(screen.getByTestId('controlCenter')).toBeInTheDocument();
  });
  test('renders a map toggle button', () => {
    renderWithProviders(<TestComponent />);
    expect(screen.getByRole('button', { name: /minimap/i })).toBeInTheDocument();
  });
  test('toggles the minimap visibility', async () => {
    const user = userEvent.setup();
    const setMapVisible = vi.fn();
    const { rerender } = renderWithProviders(
      <TestComponent mapVisible={true} setMapVisible={setMapVisible} />
    );
    await user.click(screen.getByRole('button', { name: /minimap/i }));
    expect(setMapVisible).toHaveBeenCalled();
    rerender(<TestComponent setMapVisible={setMapVisible} />);
    await user.click(screen.getByRole('button', { name: /minimap/i }));
    expect(setMapVisible).toHaveBeenCalled();
  });
  test('renders a layout toggle button', () => {
    renderWithProviders(<TestComponent />);
    expect(screen.getByRole('button', { name: /layout/i })).toBeInTheDocument();
  });
  test('toggles the layout direction', async () => {
    const user = userEvent.setup();
    const setDirection = vi.fn();
    const { rerender } = renderWithProviders(
      <TestComponent setDirection={setDirection} direction={'LR'} />
    );
    await user.click(screen.getByRole('button', { name: /layout/i }));
    expect(setDirection).toHaveBeenCalled();
    rerender(<TestComponent setDirection={setDirection} />);
    await user.click(screen.getByRole('button', { name: /layout/i }));
    expect(setDirection).toHaveBeenCalled();
  });
  test('renders a share button', () => {
    renderWithProviders(<TestComponent />);
    expect(screen.getByRole('button', { name: /share/i })).toBeInTheDocument();
  });
});
