import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { Header } from './Header';

afterEach(() => {});

describe('Header', () => {
  it('renders a title', () => {
    const title = 'hello';
    render(<Header treeTitle={title} direction={'TB'} setDirection={() => undefined} />);
    expect(screen.getByText(title)).toBeInTheDocument();
  });
  it('renders a button to toggle the layout', () => {
    render(<Header treeTitle={'foo'} direction={'TB'} setDirection={() => undefined} />);
    expect(screen.getByRole('button', { name: /layout/i })).toBeInTheDocument();
  });
});
