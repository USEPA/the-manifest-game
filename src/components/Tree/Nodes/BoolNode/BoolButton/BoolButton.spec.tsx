import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BoolButton } from '@/components/Tree/Nodes/BoolNode/BoolButton/BoolButton';
import { describe, expect, test, vi } from 'vitest';

describe('BoolButton', () => {
  test('renders a button with correct text based on response prop', () => {
    const { getByText } = render(<BoolButton id="1" response={true} />);
    expect(getByText('Yes')).toBeInTheDocument();
  });
  test('triggers onClick handler when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<BoolButton id="1" response={true} onClick={handleClick} />);
    await user.click(screen.getByRole('button', { name: 'Yes' }));
    expect(handleClick).toHaveBeenCalled();
  });
  test('has correct test id based on id and response props', () => {
    const { getByTestId } = render(<BoolButton id="1" response={false} />);
    expect(getByTestId('1-no-button')).toBeInTheDocument();
  });
});
