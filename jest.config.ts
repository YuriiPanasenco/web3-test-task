import type {Config} from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.(css|less|scss|sass|svg)$': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: ['./config/jest.setup.ts'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node', 'svg'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/', '/public/', '/config/'],
};

export default config;
