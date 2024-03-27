import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BackgroundImage } from 'components/Background/BackgroundImage';
import { describe, expect, test } from 'vitest';

describe('Background Image', () => {
  test('renders', () => {
    render(<BackgroundImage />);
    expect(screen.getByAltText(/light background/i)).toBeInTheDocument();
    expect(screen.getByAltText(/dark background/i)).toBeInTheDocument();
  });
});
