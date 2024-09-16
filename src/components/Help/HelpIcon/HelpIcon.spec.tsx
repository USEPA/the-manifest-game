import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HelpIcon } from '@/components/Help/HelpIcon/HelpIcon';
import { afterEach, describe, expect, test, vi } from 'vitest';

afterEach(() => cleanup());

describe('HelpIcon', () => {
  test('renders', () => {
    render(<HelpIcon />);
    expect(screen.getByLabelText(/more information/i)).toBeInTheDocument();
  });
  test('handles mouse Click events', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<HelpIcon onClick={onClick} />);
    await user.click(screen.getByLabelText(/more information/i));
    expect(onClick).toHaveBeenCalled();
  });
});
