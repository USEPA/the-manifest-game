import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { HelpIcon } from './HelpIcon';

afterEach(() => cleanup());

describe('HelpIcon', () => {
  test('renders', () => {
    render(<HelpIcon />);
    expect(screen.getByLabelText(/help/i)).toBeInTheDocument();
  });
  test('handles mouse Click events', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<HelpIcon onClick={onClick} />);
    await user.click(screen.getByLabelText(/help/i));
    expect(onClick).toHaveBeenCalled();
  });
});
