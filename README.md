# Next-Gen Fullstack Monorepo

这是一个基于 Bun + Turborepo + Rust 工具链 构建的工业级全栈 Monorepo 模板。追求极致的构建速度与全链路类型安全。

# Tech Stack

- 运行时 (Runtime): Bun - 毫秒级启动，原生支持 TypeScript 和环境变量。

- 构建引擎: Turborepo 2 - 智能任务编排，极致的本地与远程缓存。

- 底层工具链 (Rust Driven):
  - Bundler: tsdown (基于 Rolldown/Oxc) - 替代传统的 tsup/esbuild，享受 Rust 级别的打包性能。

  - Frontend: Next.js 15 (Turbopack) & Tailwind CSS 4

- 后端架构:
  - API: Hono - 部署在 Bun 上的超轻量 Web 标准框架。

  - ORM: Drizzle - 全类型安全，支持 SQLite/PostgreSQL/MySQL。

  - 类型同步: 跨包引用自动感知，支持 .d.mts 实时构建。

# Project structure

```
├── apps/
│   ├── web/           # Next.js 15 (Frontend)
│   └── server/        # Hono (Backend API via Bun)
├── packages/
│   ├── api/           # 业务逻辑与 tRPC/Hono 定义
│   ├── db/            # Drizzle Schema & Client
│   ├── auth/          # Next-Auth 共享配置
│   ├── ui/            # React 19 组件库 (tsup/tsdown)
│   ├── validators/    # 共享 Zod 校验 Schema
│   ├── tailwind-config/ # 全局 CSS/Tailwind 4 预设
│   └── typescript-config/ # 严格模式 TS 配置基座
└── turbo.json         # 拓扑任务流水线定义
```

# How to run?

```
pnpm dev      # 启动全栈开发环境 (Next.js + Hono + Watchers)
pnpm build    # 触发 Full Turbo 增量构建
pnpm typecheck # 跨包类型安全性检查
pnpm format   # 基于 Prettier 的自动化代码格式化
```

# 架构设计原则

1. 单点事实来源: 所有的数据库 Schema、Zod 校验和类型定义均在 packages/ 下声明，并在 apps/ 中消费。

2. 构建不感知: 开发者只需专注于业务逻辑，通过 tsdown 自动处理复杂的 Monorepo 类型引用映射。

3. 零冗余脚本: 移除所有手动 clean 命令，利用工具链自身的 Cache-Invalidation 机制。
