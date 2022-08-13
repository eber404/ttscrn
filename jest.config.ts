import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  setupFiles: ["./env-jest.ts"],
  roots: ["<rootDir>/"],
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
    "@test/(.*)": "<rootDir>/test/$1",
  },
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: ".",
  testRegex: [".*\\.spec\\.ts$", ".*\\.e2e-spec\\.ts$"],
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  collectCoverageFrom: ["src/**/*.(t|j)s"],
  coverageDirectory: "coverage",
  coverageThreshold: {
    global: {
      statements: 87,
      branches: 77,
      functions: 84,
      lines: 86,
    },
  },
  testEnvironment: "node",
};

export default config;
