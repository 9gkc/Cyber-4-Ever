import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? "/Cyber-4-Ever/" : "/",
  plugins: [react()],
  test: {
    environment: "node",
    globals: true,
  },
});
