# ADR 003: 采用 Monorepo 源码重定向 (Source Redirect) 模式

## 状态
已接受 (Accepted)

## 背景
Monorepo 中的多包协作通常需要先将 `packages/*` 编译至 `dist` 目录，App 才能引用。这导致修改公共包代码后需要手动运行 Build，热更新（HMR）缓慢，极大地影响了开发体验。

## 决策
通过 `package.json` 的 `exports` 字段配置 `development` 条件，使应用在开发环境下直接指向 `src/index.ts(x)` 源码，并配合 Next.js 的 `transpilePackages` 配置进行实时编译。

## 理由
1. **极致 HMR 体验**：修改 UI 组件或工具函数后，前端页面秒级热更新，无需中间构建步骤。
2. **调试友好**：浏览器控制台报错直接指向原始 TS 源码行数，而非混淆后的 `dist` 代码。
3. **简化流程**：开发者不再需要开启多个 `watch` 进程，只需启动 App 的 `dev` 模式即可带动全局。

## 后果
* **优点**：显著提升了本地开发效率，实现了类似于“Bundless”的协作体验。
* **影响**：要求所有内部包遵循统一的入口规范（如 `src/index.ts`），且 App 层需要具备处理 Workspace 源码的编译能力（如 Turbopack 或 SWC）。