import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? "/Cyber-4-Ever/" : "/",
  plugins: [react()],
  server: {
    allowedHosts: ["5190-il4uutavt59mv30h5rav3-3e23f528.us1.manus.computer"],
  },
  test: {
    environment: "node",
    globals: true,
  },
});
