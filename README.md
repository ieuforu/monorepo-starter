# Next-Gen Fullstack Monorepo

An industrial-grade, high-performance Fullstack Monorepo boilerplate powered by Bun, Turborepo, and a Rust-driven
toolchain. Engineered for sub-millisecond feedback loops and end-to-end type safety.

## 🚀 Tech Stack

Runtime & Orchestration

- Runtime: Bun – Sub-millisecond startup, native TypeScript execution, and built-in environment variable management.

- Orchestration: Turborepo 2 – Intelligent task scheduling with aggressive local and remote caching.

Rust-Driven Toolchain

- Linting: Oxlint – A high-performance Linter built in Rust, up to 100x faster than ESLint.

- Bundling: tsdown (Powered by Rolldown/Oxc) – The next-generation bundler for shared packages, offering Rust-level
  build
  speeds.

- Frontend Engine: Next.js 15+ with Turbopack – Optimized for instant HMR.

- Styling: Tailwind CSS 4 – Zero-runtime CSS engine.

Backend & Data Layer

- API Framework: Hono – Lightweight, Web-standard framework running on Bun.
- ORM: Drizzle ORM – Headless, type-safe ORM with automated migrations.
- Validation: Zod – Shared schemas across frontend, backend, and database layers.

## 📂 Project Structure

```
├── apps/
│   ├── web/                # Next.js 15 (Frontend)
│   └── server/             # Hono (Backend API via Bun)
├── packages/
│   ├── api/                # Business logic & Route definitions
│   ├── db/                 # Drizzle Schemas, Migrations & Client
│   ├── auth/               # Shared Authentication (Next-Auth)
│   ├── ui/                 # React 19 Component Library (tsdown)
│   ├── validators/         # Universal Zod Validation Schemas
│   ├── tailwind-config/    # Global CSS & Tailwind 4 Presets
│   ├── typescript-config/  # Base TSConfig shared across workspace
│   └── eslint-config/      # Modern Flat Config (ESLint + Oxlint integration)
└── turbo.json              # Topological pipeline definitions
```

## 🛠️ Development Workflow

```shell
# Start full-stack development (Next.js + Hono + Database)
pnpm dev

# Trigger Full Turbo incremental build
pnpm build

# Millisecond-speed static analysis via Oxlint
pnpm lint

# Cross-package type safety check
pnpm typecheck

# Standardized code formatting
pnpm format
```

## 🏗️ Architectural Principles

1. Single Source of Truth (SSOT)
   All Database Schemas, Zod Validators, and TypeScript definitions are declared once in packages/ and consumed
   everywhere. A change in the database schema instantly propagates errors to the frontend if types mismatch.
2. Rust-First Tooling
   Legacy Node.js tools are replaced by Rust-based alternatives where possible. Linting 50+ files takes ~20ms via
   Oxlint, and package bundling is handled by Rolldown, minimizing developer wait time.
3. Seamless Source Mapping
   Utilizes development exports in package.json to allow apps to consume shared packages directly from src. This
   eliminates the need for manual build steps during local development.
4. Zero-Config Environment
   Native Bun integration ensures .env files are automatically loaded without third-party libraries, providing a unified
   environment setup across the entire monorepo.

## 基础设施检查清单

- 运行时: Bun (基于 Zig)

- 代码扫描: Oxlint (基于 Rust)

- 打包构建: tsdown/Rolldown (基于 Rust)

- 前端编译: Turbopack (基于 Rust)

- 类型安全: 全栈 Zod + Drizzle 闭环
