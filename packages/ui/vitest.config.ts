import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    css: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      exclude: ["**/index.ts", "**/*.types.ts", "**/test/**"],
    },
  },
});
