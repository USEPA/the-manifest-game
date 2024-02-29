import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { Header } from './Header';

const TestComponent = ({ title }: { title?: string }) => {
  return <Header treeTitle={title ?? 'foo'} />;
};

describe('Header', () => {
  afterEach(() => cleanup());
  it('renders a title', () => {
    const title = 'hello';
    render(<TestComponent title={title} />);
    expect(screen.getByText(title)).toBeInTheDocument();
  });
});
