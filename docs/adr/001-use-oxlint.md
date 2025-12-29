# ADR 1: 使用 Oxlint 替代原生 ESLint

## 背景
随着代码库增长，原生 ESLint (JS 编写) 的检查速度成为 CI 和本地开发的瓶颈。

## 决策
引入基于 Rust 的 `oxlint` 作为核心 Linter，并保留 `biome` 处理格式化。

## 理由
1. **极致性能**：Oxlint 速度比 ESLint 快 50 倍以上，能在 50ms 内完成全量检查。
2. **零配置**：内置了绝大多数最佳实践，减少了维护 `.eslintrc` 的心智负担。
3. **兼容性**：支持原生 ESLint 规则，迁移成本低。

## 影响
- 显著提升 `lint-staged` 的运行速度。
- 减少 CI 流水线的构建时间。