import tsParser from "@typescript-eslint/parser";

export default [
  {
    ignores: [
      ".next/**",
      "out/**",
      "node_modules/**",
      "dist/**",
      "*.config.js",
      "*.config.mjs",
      "*.config.ts",
    ],
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      "no-unused-vars": "off",
      "no-console": "off",
    },
  },
];
