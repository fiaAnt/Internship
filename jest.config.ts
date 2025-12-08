import type { Config } from 'jest'

const config: Config = {
    transform: {
        "^.+\\.(t|j)sx?$": "babel-jest"
    },
    testEnvironment: 'jsdom',
    testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"]
}

export default config