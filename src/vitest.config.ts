import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    // use Infinity on local for `page.pause()`
    testTimeout: process.env.CI ? 240_000 : Number.POSITIVE_INFINITY,
    fileParallelism: false,
    globalSetup: ["./common/downloadSetup.ts"],
    retry: 0,
  },
})
