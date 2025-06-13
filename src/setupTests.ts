import '@testing-library/jest-dom';
import '@testing-library/jest-dom/matchers';
import { vi } from 'vitest';

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// https://zustand.docs.pmnd.rs/guides/testing#vitest
vi.mock('zustand');

class DOMMatrixReadOnly {
  m22: number;

  constructor(transform: string) {
    const scale = transform?.match(/scale\(([1-9.])\)/)?.[1];
    this.m22 = scale !== undefined ? +scale : 1;
  }
}

// @ts-expect-error - https://github.com/xyflow/xyflow/issues/716#issuecomment-1246602067
global.DOMMatrixReadOnly = DOMMatrixReadOnly;
