# ADR 003: 采用基于 package.json exports 的源码重定向模式

## 状态
已接受 (Accepted)

## 背景
传统的 Monorepo 协作依赖 `tsconfig paths` 进行源码映射，但这并非 Node.js 标准协议，容易导致构建工具（如 Bun build）与 IDE（TS Server）解析逻辑不一致。

## 决策
全面移除所有包及应用的 `tsconfig.json` 中的 `paths` 配置。利用 `package.json` 的 `exports` 字段定义 `development` 条件分支，指向 `src/index.ts`。

## 理由
1. **标准协议**：`exports` 是 Node.js 官方标准，被所有现代构建工具（Bun, Rolldown, Turbopack）原生支持。
2. **零手动维护**：无需在每个 App 的 `tsconfig` 中手动维护冗长的路径列表。
3. **IDE 性能**：减少 TypeScript 语言服务器的解析负担，提升大型 Monorepo 中的响应速度。

## 后果
* **优点**：实现了“真源码引用”，开发者修改 `packages/db` 的代码，`apps/web` 会通过标准的模块解析逻辑立即感知。
* **影响**：要求各包的 `package.json` 必须严格声明 `exports`，且 App 需要配置 `moduleResolution: "bundler"` 以支持该特性。