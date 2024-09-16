import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, it } from 'vitest';
import { Button } from './Button';

describe('Button component', () => {
  it('renders with default variant and size', () => {
    render(<Button>Default Button</Button>);
    const button = screen.getByRole('button', { name: /default button/i });
    expect(button).toHaveClass('bg-primary text-primary-foreground h-10 px-4 py-2');
  });

  it('renders with destructive variant', () => {
    render(<Button variant="destructive">Destructive Button</Button>);
    const button = screen.getByRole('button', { name: /destructive button/i });
    expect(button).toHaveClass('bg-destructive text-destructive-foreground');
  });

  it('renders with outline variant', () => {
    render(<Button variant="outline">Outline Button</Button>);
    const button = screen.getByRole('button', { name: /outline button/i });
    expect(button).toHaveClass('border border-input bg-background');
  });

  it('renders with secondary variant', () => {
    render(<Button variant="secondary">Secondary Button</Button>);
    const button = screen.getByRole('button', { name: /secondary button/i });
    expect(button).toHaveClass('bg-secondary text-secondary-foreground');
  });

  it('renders with ghost variant', () => {
    render(<Button variant="ghost">Ghost Button</Button>);
    const button = screen.getByRole('button', { name: /ghost button/i });
    expect(button).toHaveClass('hover:bg-accent hover:text-accent-foreground');
  });

  it('renders with link variant', () => {
    render(<Button variant="link">Link Button</Button>);
    const button = screen.getByRole('button', { name: /link button/i });
    expect(button).toHaveClass('text-primary underline-offset-4 hover:underline');
  });

  it('renders with small size', () => {
    render(<Button size="sm">Small Button</Button>);
    const button = screen.getByRole('button', { name: /small button/i });
    expect(button).toHaveClass('h-9 rounded-md px-3');
  });

  it('renders with large size', () => {
    render(<Button size="lg">Large Button</Button>);
    const button = screen.getByRole('button', { name: /large button/i });
    expect(button).toHaveClass('h-11 rounded-md px-8');
  });

  it('renders with icon size', () => {
    render(<Button size="icon">Icon Button</Button>);
    const button = screen.getByRole('button', { name: /icon button/i });
    expect(button).toHaveClass('size-10');
  });

  it('renders as a child component', () => {
    render(
      <Button asChild>
        <a href="/test">Child Button</a>
      </Button>
    );
    const link = screen.getByRole('link', { name: /child button/i });
    expect(link).toHaveAttribute('href', '/test');
  });

  it('applies additional class names', () => {
    render(<Button className="extra-class">Class Button</Button>);
    const button = screen.getByRole('button', { name: /class button/i });
    expect(button).toHaveClass('extra-class');
  });

  it('forwards refs correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref Button</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
