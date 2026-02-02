/** @type {import('ts-jest').JestConfigWithTsJest} */
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@store/(.*)$': '<rootDir>/client/src/store/$1',
    '^@components/(.*)$': '<rootDir>/client/src/components/$1',
    '^@elements/(.*)$': '<rootDir>/client/src/components/elements/$1',
    '^@assets/(.*)$': '<rootDir>/client/src/assets/$1',
    '^@api/(.*)$': '<rootDir>/client/src/api/$1',
    '^types/(.*)$': '<rootDir>/client/src/types/$1',
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/client/__mocks__/fileMock.js',
  },
  setupFilesAfterEnv: ['<rootDir>/client/src/setupTests.ts'],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
    '^.+\\.(png|jpg|jpeg|svg)$': 'jest-transform-stub',
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],

  roots: ['<rootDir>/client'],
  moduleDirectories: ['node_modules', '<rootDir>/client/src'],

  modulePaths: ['<rootDir>/client/src'],

  transformIgnorePatterns: [
    'node_modules/(?!(.*\\.mjs$|react-markdown|vfile|unist-.*|unified|bail|is-plain-obj|trough|remark-.*|mdast-util-.*|micromark.*|decode-named-character-reference|character-entities|property-information|hast-util-.*|space-separated-tokens|comma-separated-tokens|pretty-bytes|ccount|escape-string-regexp|markdown-table))',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
