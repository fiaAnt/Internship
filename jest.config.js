export default {
  preset: 'jest-puppeteer',
  testMatch: ['**/src/tests/**/*.test.ts'],
  setupFilesAfterEnv: ['./src/setup.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testTimeout: 100000,
  verbose: true,
  maxWorkers: 1,
};
