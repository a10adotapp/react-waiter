import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "dist/**/*",
      "examples/**/*",
      "node_modules/**/*",
    ],
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
);
