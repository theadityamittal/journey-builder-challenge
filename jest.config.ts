import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jsdom',

  // ①  transform every .ts / .tsx file with ts-jest
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.jest.json',   // ←  use the new JSX-enabled config
      },
    ],
  },

  moduleNameMapper: {
    // ignore CSS-modules
    '\\.(css|scss|sass|less)$': 'identity-obj-proxy',
  },

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default config;
