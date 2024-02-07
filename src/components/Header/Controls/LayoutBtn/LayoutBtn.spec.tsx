import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LayoutBtn } from 'components/Header/Controls/LayoutBtn/LayoutBtn';
import { describe, expect, it, vi } from 'vitest';

describe('LayoutBtn', () => {
  it('should render with initial layout direction', () => {
    const toggleDirection = vi.fn();
    render(<LayoutBtn isHorizontal={true} toggleDirection={toggleDirection} />);
    expect(screen.getByRole('button', { name: /switch to vertical layout/i })).toBeInTheDocument();
  });
  it('should toggle layout direction on click', async () => {
    const user = userEvent.setup();
    const toggleDirection = vi.fn();
    render(<LayoutBtn isHorizontal={true} toggleDirection={toggleDirection} />);
    await user.click(screen.getByRole('button', { name: /switch to vertical layout/i }));
    expect(toggleDirection).toHaveBeenCalled();
  });
  it('should update aria-label when layout direction changes', () => {
    const toggleDirection = vi.fn();
    const { rerender } = render(
      <LayoutBtn isHorizontal={true} toggleDirection={toggleDirection} />
    );
    rerender(<LayoutBtn isHorizontal={false} toggleDirection={toggleDirection} />);
    expect(screen.getByLabelText(/switch to horizontal layout/i)).toBeInTheDocument();
  });
});
