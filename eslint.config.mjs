import globals from "globals";
import pluginJs from "@eslint/js";
import pluginPrettier from "eslint-plugin-prettier";
import configPrettier from "eslint-config-prettier";

export default [
  {
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 12,
      sourceType: "module"
    },
    rules: {
      // Add any specific ESLint rules here
    }
  },
  {
    files: ["__tests__/**/*.js"],
    languageOptions: {
      globals: globals.jest,
    },
  },
  {
    files: ["*.config.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: globals.node,
    },
  },
  {
    files: ["playwright.config.js"],
    languageOptions: {
      sourceType: "module",
      globals: globals.node,
    },
  },
  {
    files: ["babel.config.js", "jest.config.js"],
    languageOptions: {
      sourceType: "module",
      globals: globals.node,
    },
  },
  pluginJs.configs.recommended,
  configPrettier,
  {
    plugins: {
      prettier: pluginPrettier
    },
    rules: {
      "prettier/prettier": "error"
    }
  }
];