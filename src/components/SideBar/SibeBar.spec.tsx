import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';
import { SideBar } from './SideBar';

afterEach(() => cleanup());

describe('Sidebar', () => {
  test('renders', () => {
    render(<SideBar />);
    expect(screen.getByTestId(/sidebar/i)).toBeInTheDocument();
  });
});
