import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MiniMapBtn } from 'components/Tree/ControlCenter/Controls/MiniMapBtn/MiniMapBtn';
import { describe, expect, it, vi } from 'vitest';

describe('Minimap', () => {
  it('render', () => {
    const toggleDirection = vi.fn();
    render(<MiniMapBtn visible={true} onClick={toggleDirection} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  it('should toggle layout direction on click', async () => {
    const user = userEvent.setup();
    const toggleDirection = vi.fn();
    render(<MiniMapBtn visible={true} onClick={toggleDirection} />);
    await user.click(screen.getByRole('button'));
    expect(toggleDirection).toHaveBeenCalled();
  });
  it('should update aria-label when map is not visible', () => {
    const toggleDirection = vi.fn();
    const { rerender } = render(<MiniMapBtn visible={true} onClick={toggleDirection} />);
    expect(screen.getByLabelText(/hide/i)).toBeInTheDocument();
    rerender(<MiniMapBtn visible={false} onClick={toggleDirection} />);
    expect(screen.getByLabelText(/show/i)).toBeInTheDocument();
  });
});
