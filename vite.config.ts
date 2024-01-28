import { defineConfig } from "vite";
import eslintPlugin from "@nabla/vite-plugin-eslint";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [eslintPlugin(), tsconfigPaths()],
});
