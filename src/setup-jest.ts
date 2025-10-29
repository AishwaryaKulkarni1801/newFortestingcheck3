import 'jest-preset-angular/setup-jest';

// Add global test utilities
import { TextEncoder, TextDecoder } from 'util';

// Polyfills for Node.js environment
global.TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;

// Mock global objects that are not available in Node.js environment
Object.defineProperty(window, 'CSS', { value: null });
Object.defineProperty(window, 'getComputedStyle', {
  value: () => {
    return {
      display: 'none',
      appearance: ['-webkit-appearance']
    };
  }
});

Object.defineProperty(document, 'doctype', {
  value: '<!DOCTYPE html>'
});

Object.defineProperty(document.body.style, 'transform', {
  value: () => {
    return {
      enumerable: true,
      configurable: true
    };
  }
});

// Mock localStorage
const mockStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
};

Object.defineProperty(window, 'localStorage', {
  value: mockStorage
});

Object.defineProperty(window, 'sessionStorage', {
  value: mockStorage
});

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock IntersectionObserver
(global as any).IntersectionObserver = class MockIntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
  root = null;
  rootMargin = '';
  thresholds = [];
  takeRecords() { return []; }
};

// Mock ResizeObserver
(global as any).ResizeObserver = class MockResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock scrollIntoView
Element.prototype.scrollIntoView = jest.fn();

// Jest global configuration
jest.setTimeout(10000); // Set default timeout to 10 seconds