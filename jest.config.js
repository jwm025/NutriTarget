export default {
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.js'],
  preset: 'jest-preset-angular/preset' ? No, for vanilla:
  Actually for vanilla ESM:
  export default {
    testEnvironment: 'node',
    extensionsToTreatAsEsm: ['.js'],
    globals: {
      'ts-jest': {
        useESM: true
      }
    },
  };
Wait, no ts-jest. For vanilla JS ESM, 'type': 'module' is enough, but to be safe:
export default {
  testEnvironment: 'node',
  transform: {},
};
