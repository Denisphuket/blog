/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

import path from 'path';

export default {
    clearMocks: true,
    testEnvironment: 'jsdom',
    coveragePathIgnorePatterns: [
        '/node_modules/',
    ],
    moduleFileExtensions: [
        'js',
        'jsx',
        'ts',
        'tsx',
        'json',
        'node',
    ],
    moduleDirectories: [
        'node_modules',
    ],
    rootDir: '../../',
    testMatch: [
        '<rootDir>src/**/*(*.)@(spec|test).[tj]s?(x)',
    ],
    modulePaths: ['<rootDir>/src'],
    setupFilesAfterEnv: ['<rootDir>config/jest/setupTest.ts'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.svg': path.resolve(__dirname, 'jestEmptyComponent.tsx'),
    },
    globals: {
        __IS_DEV__: true,
    },
};
