# Next-Gen Fullstack Monorepo

An industrial-grade, high-performance Fullstack Monorepo boilerplate powered by Bun, Turborepo, and a 100% Rust-driven toolchain. Engineered for sub-millisecond feedback loops and end-to-end type safety.

## 🚀 Tech Stack

### Runtime & Orchestration
- **Runtime**: [Bun](https://bun.sh/) – Sub-millisecond startup, native TypeScript execution, and high-performance package management.
- **Orchestration**: [Turborepo 2](https://turbo.build/) – Intelligent task scheduling with aggressive local/remote caching.

### Rust-Driven Toolchain
- **Linting & Formatting**: [Biome](https://biomejs.dev/) – A unified, ultra-fast toolchain replacing ESLint and Prettier. Provides linting, formatting, and import organization in milliseconds.
- **Deep Logic Analysis**: [Oxlint](https://oxc-project.github.io/) – A high-performance Linter built in Rust, focusing on correctness and performance, running up to 100x faster than ESLint.
- **Bundling**: [tsdown](https://github.com/rolldown/tsdown) (Powered by Rolldown/Oxc) – The next-generation bundler for shared packages, offering Rust-level build speeds.
- **Frontend Engine**: Next.js 15+ with **Turbopack** – Optimized for instant Hot Module Replacement (HMR).
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) – Zero-runtime CSS engine with native support for modern CSS features.

### Backend & Data Layer
- **API Framework**: [Hono](https://hono.dev/) – Lightweight, Web-standard framework optimized for Bun.
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/) – Headless, type-safe ORM with automated migrations.
- **Validation**: [Zod](https://zod.dev/) – Shared schemas across frontend, backend, and database layers.

## 📂 Project Structure

```
├── apps/
│   ├── web/                # Next.js 15 (Frontend)
│   └── server/             # Hono (Backend API via Bun)
├── packages/
│   ├── api/                # Business logic & Route definitions
│   ├── db/                 # Drizzle Schemas, Migrations & Client
│   ├── auth/               # Shared Authentication (Auth.js)
│   ├── ui/                 # React 19 Component Library (tsdown)
│   ├── validators/         # Universal Zod Validation Schemas
│   ├── utils/              # Shared TypeScript utilities
│   ├── tailwind-config/    # Global CSS & Tailwind 4 Presets
│   └── typescript-config/  # Base TSConfig shared across workspace
└── turbo.json              # Topological pipeline definitions
```


## 🛠️ Development Workflow

```shell
# Start full-stack development (Next.js + Hono)
pnpm dev

# Trigger Full Turbo incremental build
pnpm build

# Millisecond-speed static analysis via Oxlint + Biome
pnpm lint

# Automatic fix and code cleanup
pnpm lint:fix

# Standardized code formatting
pnpm format

# Cross-package type safety check
pnpm typecheck
```

## 🏗️ Architectural Principles
1. Single Source of Truth (SSOT) All Database Schemas, Zod Validators, and TypeScript definitions are declared once in packages/ and consumed everywhere. A change in the database schema instantly propagates errors to the frontend if types mismatch.

2. Rust-First Tooling Pipeline Legacy Node.js tools are replaced by Rust-based alternatives. Linting and formatting 90+ files takes ~10ms via Oxlint and Biome, minimizing developer wait time.

3. Unified Code Quality Uses Biome for formatting and stylistic linting, combined with Oxlint for deep correctness checks. This duo ensures a cleaner codebase with zero configuration overhead between packages.

4. Seamless Source Mapping Utilizes development exports in package.json to allow apps to consume shared packages directly from src. This eliminates the need for manual build steps during local development.

5. Zero-Config Environment Native Bun integration ensures .env files are automatically loaded without third-party libraries, providing a unified environment setup across the entire monorepo.

## 📜 Architecture Decision Records (ADR)

This project maintains a set of ADRs to document the strategic technical decisions and their underlying rationales. These records provide a deep dive into the engineering philosophy behind the boilerplate.

- [ADR 001: Replacing ESLint with Oxlint for Performance](./docs/adr/001-use-oxlint.md)
- [ADR 002: End-to-End Type Safety via Drizzle-Zod SSOT](./docs/adr/002-drizzle-zod-ssot.md)
- [ADR 003: Monorepo Source Redirect for Seamless DX](./docs/adr/003-source-redirect-mode.md)

# Built with  by the Rust Toolchain Revolution.