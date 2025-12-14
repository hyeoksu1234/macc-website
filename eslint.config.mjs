import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import tseslint from "typescript-eslint";
import globals from "globals";

const nextCoreWebVitals = nextPlugin.configs["core-web-vitals"];

export default tseslint.config(
  {
    ignores: [
      "node_modules",
      ".next",
      "dist",
      ".turbo",
      "public",
      "src/app/blog/debug.tsx",
      "src/app/blog/[slug]/debug-page.tsx",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextCoreWebVitals.rules,
    },
  }
);
