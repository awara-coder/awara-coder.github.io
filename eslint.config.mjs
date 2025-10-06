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
    files: ["tests/**/*.js"],
    languageOptions: {
      globals: {
        QUnit: true
      }
    }
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