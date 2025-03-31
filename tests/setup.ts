import '@testing-library/jest-dom';


// Polyfill for ResizeObserver in vitest + JSDOM
global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  