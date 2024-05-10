import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { ShareBtn } from 'components/Tree/ControlCenter/Controls/ShareBtn/ShareBtn';
import { renderWithProviders } from 'test-utils';
import { describe, expect, test } from 'vitest';

describe('ShareBtn', () => {
  test('render a button with aria label "share" ', () => {
    renderWithProviders(<ShareBtn />);
    expect(screen.getByRole('button', { name: /share/i })).toBeInTheDocument();
  });
});
