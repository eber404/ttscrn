module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint/eslint-plugin"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
  ],
  settings: {
    "import/resolver": {
      typescript: {
        project: "./tsconfig.json",
      },
    },
  },
  rules: {
    "dot-notation": "off",
    "@typescript-eslint/dot-notation": ["error"],
    "@typescript-eslint/explicit-member-accessibility": ["error"],
    "@typescript-eslint/explicit-function-return-type": ["error"],
    "@typescript-eslint/explicit-module-boundary-types": ["error"],
    "@typescript-eslint/prefer-enum-initializers": ["error"],
    "@typescript-eslint/prefer-optional-chain": ["error"],
    "@typescript-eslint/prefer-readonly": ["error"],
    "@typescript-eslint/sort-type-union-intersection-members": ["error"],
    "no-restricted-imports": "off",
    /* "@typescript-eslint/no-restricted-imports": [
      "error",
      {
        patterns: [".*"],
      },
    ], */
    "import/order": [
      "error",
      {
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        pathGroups: [
          {
            pattern: "@/infra/**",
            group: "external",
            position: "after",
          },
          {
            pattern: "@/adapters/**",
            group: "external",
            position: "after",
          },
          {
            pattern: "@/application/**",
            group: "external",
            position: "after",
          },
          {
            pattern: "@/domain/**",
            group: "external",
            position: "after",
          }
        ],
        "newlines-between": "always",
      },
    ],
    "import/no-restricted-paths": [
      "error",
      {
        zones: [
          {
            target: "./src/domain/**/*",
            from: "./src/application/**/*",
          },
          {
            target: "./src/application/**/*",
            from: "./src/adapters/**/*",
          },
          {
            target: "./src/adapters/**/*",
            from: "./src/infra/**/*",
          },
        ],
      },
    ],
  },
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [".eslintrc.js"],
};
