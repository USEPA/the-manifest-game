import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Header } from './Header';

afterEach(() => {});

describe('Header', () => {
  it('renders a title', () => {
    const title = 'hello';
    render(<Header treeTitle={title} direction={'TB'} setDirection={() => undefined} />);
    expect(screen.getByText(title)).toBeInTheDocument();
  });
  it('renders a layout toggle button', () => {
    const setDirection = vi.fn();
    render(<Header treeTitle={'foo'} direction={'LR'} setDirection={setDirection} />);
    expect(screen.getByRole('button', { name: /layout/i })).toBeInTheDocument();
  });
  it('toggles the layout direction', async () => {
    const user = userEvent.setup();
    const setDirection = vi.fn();
    const { rerender } = render(
      <Header treeTitle={'foo'} direction={'LR'} setDirection={setDirection} />
    );
    await user.click(screen.getByRole('button', { name: /layout/i }));
    expect(setDirection).toHaveBeenCalled();
    rerender(<Header treeTitle={'foo'} direction={'TB'} setDirection={setDirection} />);
    await user.click(screen.getByRole('button', { name: /layout/i }));
    expect(setDirection).toHaveBeenCalled();
  });
});
