// scripts/wait-for.mjs
import { existsSync } from 'fs'
import { resolve } from 'path'

// 列出所有需要预构建的 workspace 包
const REQUIRED_PACKAGES = ['@repo/db', '@repo/utils', '@repo/validators', '@repo/ui']

function checkReady() {
  return REQUIRED_PACKAGES.every((pkg) => {
    const file = resolve('node_modules', pkg, 'dist', 'index.mjs')
    return existsSync(file)
  })
}

async function waitForDeps() {
  console.log('⏳ Waiting for library builds...')
  while (!checkReady()) {
    await new Promise((r) => setTimeout(r, 150))
  }
  console.log('✅ All libraries ready.')
}

async function main() {
  await waitForDeps()
  const { spawn } = await import('child_process')
  const [cmd, ...args] = process.argv.slice(2)
  const child = spawn(cmd, args, { stdio: 'inherit' })
  child.on('exit', (code) => process.exit(code ?? 0))
}

if (process.argv.length < 3) {
  console.error('Usage: node wait-for.mjs <command>')
  process.exit(1)
}

main()
