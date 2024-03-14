import '@testing-library/jest-dom';
import '@testing-library/jest-dom/matchers';
import { vi } from 'vitest';

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.mock('zustand'); // to make it works like Jest (auto-mocking)

class DOMMatrixReadOnly {
  m22: number;

  constructor(transform: string) {
    const scale = transform?.match(/scale\(([1-9.])\)/)?.[1];
    this.m22 = scale !== undefined ? +scale : 1;
  }
}

// @ts-expect-error - https://github.com/xyflow/xyflow/issues/716#issuecomment-1246602067
global.DOMMatrixReadOnly = DOMMatrixReadOnly;
