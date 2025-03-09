import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  testPathIgnorePatterns: ['pages/.next/', 'pages/node_modules/'],
  coverageReporters: ['html', 'text'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
};

export default config;
