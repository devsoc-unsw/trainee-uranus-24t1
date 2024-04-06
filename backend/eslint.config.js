// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { ignoreRestSiblings: true },
      ],
      indent: ["error", 2, { SwitchCase: 1 }],
      "space-before-blocks": "error",
      "keyword-spacing": ["error", { before: true, after: true }],
      "space-infix-ops": "error",
    },
  },
);
