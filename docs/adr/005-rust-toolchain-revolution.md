# ADR 005: Transitioning to a Rust-First Engineering Toolchain

## Status
Accepted

## Context
随着项目规模扩大，传统的 Node.js 生态工具（ESLint, Prettier, tsup）在处理大规模拓扑依赖时，其单线程、基于解释执行的特性成为了性能瓶颈。在开发过程中，保存代码后的校验等待时间严重中断了开发者的“心流”状态。

## Decision
我们决定彻底重构工具链，拥抱 **"The Rust Revolution"**。将核心构建和分析链路切换到高性能 Rust 原生工具。

### Toolchain Map:
- **Linter**: 使用 `Oxlint` 处理深层逻辑扫描。
- **Formatter & Lint**: 使用 `Biome` 实现全仓库格式化与基础校验的一致性。
- **Bundler**: 引入 `tsdown` (Powered by `Rolldown`) 构建共享包。

## Rationale
1. **Parallel Execution (并行计算)**: 充分利用现代多核 CPU，通过 Rust 原生线程加速静态分析。
2. **Zero-Allocation AST**: Oxlint 具备零分配解析能力，极大地降低了内存占用与 GC 压力。
3. **Unified Standard**: 减少 JS 编写的插件体系，降低了工具链自身的维护成本与安全漏洞风险。

## Consequences
- **Ultra-Fast Feedback Loop**: 反馈速度提升约 300 倍，实现真正的“即时”校验。
- **Zero-Config DX**: 消灭了复杂的 `.eslintrc` 和 `.prettierrc` 冲突。
- **Production Safety**: Oxlint 捕获了更多生产环境下的边缘 Case。
- **Risk**: 针对极少数不支持的旧版 ESLint 插件，保留按需调用的 Fallback 机制。