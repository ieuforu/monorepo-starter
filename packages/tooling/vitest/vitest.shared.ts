import { defineConfig, mergeConfig } from 'vitest/config'

export { defineConfig, mergeConfig }

export const sharedConfig = defineConfig({
  test: {
    globals: true,
    environment: 'node',
    exclude: ['**/node_modules/**', '**/dist/**', '**/target/**'],
  },
})
