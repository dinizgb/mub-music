import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";

const __dirname = dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

const dropRemovedJsdocRules = (configs) =>
  configs.map((config) => {
    if (!config.rules) {
      return config;
    }

    const rules = { ...config.rules };
    delete rules["require-jsdoc"];
    delete rules["valid-jsdoc"];
    return { ...config, rules };
  });

export default [
  {
    ignores: [
      ".next/**",
      "coverage/**",
      "node_modules/**",
      "out/**",
      "build/**",
    ],
  },
  ...dropRemovedJsdocRules(
    compat.extends("plugin:react/recommended", "google", "prettier")
  ),
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      "spaced-comment": ["error", "always", { markers: ["/"] }],
      // Next.js / React 17+ JSX transform does not require React in scope.
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      // TypeScript already validates component props.
      "react/prop-types": "off",
    },
    settings: {
      react: {
        version: "19.2.8",
      },
    },
  },
];
