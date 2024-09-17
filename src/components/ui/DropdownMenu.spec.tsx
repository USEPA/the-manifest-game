import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

describe('DropdownMenu', async () => {
  const user = userEvent.setup();
  it('renders DropdownMenuTrigger and opens DropdownMenuContent on click', async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    await user.click(screen.getByText('Open Menu'));
    expect(screen.getByText('Item 1')).toBeInTheDocument();
  });

  it('renders DropdownMenuCheckboxItem and toggles checked state', async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem checked>Checkbox Item</DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    await user.click(screen.getByText('Open Menu'));
    const checkboxItem = screen.getByText('Checkbox Item');
    expect(checkboxItem).toBeInTheDocument();
    await user.click(checkboxItem);
    expect(checkboxItem).not.toHaveAttribute('checked');
  });

  it('renders DropdownMenuLabel and displays label text', async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Label</DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    await user.click(screen.getByText('Open Menu'));
    expect(screen.getByText('Label')).toBeInTheDocument();
  });

  it('renders DropdownMenuSeparator and displays separator', async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
    );
    await user.click(screen.getByText('Open Menu'));
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('renders DropdownMenuShortcut and displays shortcut text', async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            Item 1<DropdownMenuShortcut>Ctrl+S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    await user.click(screen.getByText('Open Menu'));
    expect(screen.getByText('Ctrl+S')).toBeInTheDocument();
  });
});
