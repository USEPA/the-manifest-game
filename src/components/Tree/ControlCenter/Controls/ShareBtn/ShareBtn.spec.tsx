import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ShareBtn } from 'components/Tree/ControlCenter/Controls/ShareBtn/ShareBtn';
import { describe, expect, test } from 'vitest';

describe('ShareBtn', () => {
  test('render a button with aria label "share" ', () => {
    render(<ShareBtn />);
    expect(screen.getByRole('button', { name: /share/i })).toBeInTheDocument();
  });
});
