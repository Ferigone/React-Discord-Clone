module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/jsx-runtime", // Added for React 17+ JSX Transform
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "!vitest.config.ts"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "react/react-in-jsx-scope": "off", // React 17+ doesn't require React in scope for JSX
    "react/button-has-type": "error", // Ensure buttons have a 'type' attribute
    "react/prop-types": "off", // Turn off if using TypeScript for prop validation
    "react/require-default-props": "error", // Ensure optional props have default values
    "react/no-array-index-key": "error", // Avoid using array index as key in lists
    "react/display-name": "warn", // Ensure components have a display name
    "react/no-children-prop": "error", // Proper usage of children prop
  },
  settings: {
    react: { version: "18.2.0" }, // Updated to your current React version
  },
  overrides: [
    {
      files: ["src/**/*.ts", "src/**/*.tsx", "vitest.config.ts"],
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
      },
    },
  ],
};
