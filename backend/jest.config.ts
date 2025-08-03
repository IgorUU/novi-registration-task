import type { Config } from "jest";

const config: Config = {
  preset: "@shelf/jest-mongodb",
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testMatch: ['**/tests/**/*.test.ts'],
};

export default config;
