import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { Header } from './Header';

afterEach(() => {});

describe('Header', () => {
  it('renders a title', () => {
    const title = 'hello';
    render(<Header treeTitle={title} />);
    expect(screen.getByText(title)).toBeInTheDocument();
  });
});
