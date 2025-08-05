import type { Config } from "jest";

const config: Config = {
  preset: "@shelf/jest-mongodb",
  testMatch: ['**/tests/**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};

export default config;
