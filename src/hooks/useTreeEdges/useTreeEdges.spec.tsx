import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';

afterEach(() => cleanup());

describe('useTreeEdges', () => {
  test('is set up', () => {
    expect(true).toBeTruthy();
  });
});
