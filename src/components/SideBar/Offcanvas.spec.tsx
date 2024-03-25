import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { OffCanvas } from 'components/SideBar/OffCanvas';
import { afterEach, describe, expect, test } from 'vitest';

afterEach(() => cleanup());

describe('Sidebar', () => {
  test('renders', () => {
    render(<OffCanvas />);
    expect(screen.getByTestId(/offcanvas/i)).toBeInTheDocument();
  });
});
