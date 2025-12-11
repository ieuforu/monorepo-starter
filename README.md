# Monorepo Starter

[![pnpm](https://img.shields.io/badge/pnpm-10-yellow)](https://pnpm.io/)
[![Turborepo](https://img.shields.io/badge/Turborepo-2-blue)](https://turbo.build/)
[![License](https://img.shields.io/badge/license-MIT-green)](./LICENSE)

Minimal monorepo template with **Turborepo + pnpm workspace**.

## Tech Stack

- **Build System**: Turborepo
- **Package Manager**: pnpm
- **Frontend**: Next.js 15, React 19, Tailwind CSS 4
- **Code Quality**: ESLint 9, Prettier, Husky, lint-staged

## Structure

```
├── apps/
│ └── web/ # Next.js application
├── packages/
│ ├── ui/ # Shared UI components
│ ├── utils/ # Shared utilities
│ ├── tailwind-config/ # Shared Tailwind theme
│ ├── typescript-config/ # Shared TS config
│ └── eslint-config/ # Shared ESLint config
├── turbo.json
└── pnpm-workspace.yaml
```

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development
pnpm dev

# Build all packages
pnpm build

# Lint all packages
pnpm lint

# Format code
pnpm format
```

## Adding New Package

```
# Create new app
mkdir -p apps/new-app

# Create new shared package
mkdir -p packages/new-package
```

Reference workspace packages:

```
{
  "dependencies": {
    "@repo/ui": "workspace:*"
  }
}
```

## License

MIT
