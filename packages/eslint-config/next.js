import base from './base.js'
import nextPlugin from '@next/eslint-plugin-next'

export default [
  ...base,
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
    },
  },
]
