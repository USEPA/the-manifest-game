import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { OffCanvas } from 'components/OffCanvas/OffCanvas';
import { afterEach, describe, expect, test, vi } from 'vitest';

afterEach(() => cleanup());

describe('OffCanvas', () => {
  test('renders', () => {
    render(<OffCanvas isOpen={true} handleClose={() => undefined} />);
    expect(screen.getByTestId(/offcanvas/i)).toBeInTheDocument();
  });

  test('handles close event', () => {
    const handleClose = vi.fn();
    render(<OffCanvas isOpen={true} handleClose={handleClose} />);
    screen.getByRole('button', { name: /close/i }).click();
    expect(handleClose).toHaveBeenCalled();
  });
  test('closes modal when user clicks close', () => {
    const handleClose = vi.fn();
    const { rerender } = render(<OffCanvas isOpen={true} handleClose={handleClose} />);
    expect(screen.getByTestId(/offcanvas/i)).toBeVisible();
    rerender(<OffCanvas isOpen={false} handleClose={handleClose} />);
    expect(screen.getByTestId(/offcanvas/i)).not.toBeVisible();
  });
});
