import { jest } from '@jest/globals';
Object.defineProperty(global, 'document', {
  value: { getElementById: jest.fn() },
  writable: true,
});
