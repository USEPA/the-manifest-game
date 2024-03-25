import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { OffCanvas } from 'components/SideBar/OffCanvas';
import { afterEach, describe, expect, test } from 'vitest';

afterEach(() => cleanup());

describe('OffCanvas', () => {
  test('renders', () => {
    render(<OffCanvas isOpen={true} handleClose={() => undefined} />);
    expect(screen.getByTestId(/offcanvas/i)).toBeInTheDocument();
  });
  test('title is "help" by default', () => {
    render(<OffCanvas isOpen={true} handleClose={() => undefined} />);
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
  });
  test('renders an optionally provided title', () => {
    const myTitle = 'My Title';
    render(<OffCanvas isOpen={true} handleClose={() => undefined} title={myTitle} />);
    expect(screen.getByRole('heading', { name: myTitle })).toBeInTheDocument();
  });
});
