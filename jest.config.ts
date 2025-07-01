import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      { tsconfig: 'tsconfig.jest.json' },
    ],
  },
  moduleNameMapper: {
    '\\.(css|scss|sass|less)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default config;
