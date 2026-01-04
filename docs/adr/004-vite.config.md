# 基于工厂模式的 Vite 共享基座设计

## 状态
已通过 (Accepted)

# 上下文 (Context)
在 Monorepo 架构中，存在多个 React 子应用（如 apps/react-app）。如果每个子应用都独立维护一份复杂的 vite.config.ts，会导致：

1. 配置冗余：插件配置（React, Tailwind）、Alias 定义、构建逻辑（Manual Chunks）重复编写。

2. 环境不一致：不同应用对环境变量、输出路径、兼容性处理（如 process.env）的实现不统一。

3. 维护成本高：升级构建工具或优化构建策略时，需要修改每一个子包。

# 决策 (Decision)
我们在 packages/tooling/vite 中实现了一个通用的配置工厂函数 createViteConfig。

## 核心设计细节：
1. ### 双维度逻辑分层：
- 使用 isBuild (来自 command) 处理工程化行为（代码混淆、产物清理、SourceMap）。

- 使用 isProd (来自 mode) 处理业务环境（环境变量加载路径、输出路径隔离）。

2. ### 根目录锁定 (Root Steering)：
- 显式要求传入 appDir，确保 Vite 始终在子包根目录下寻址 index.html 和 .env 文件。

3. ### 兼容性注入 (Compatibility)：
- 通过 define 自动将 loadEnv 读取的变量序列化并注入 process.env，解决第三方旧库在 ESM 环境下的报错。
4. ### 统一路径别名 (Global Aliases)：
- 默认集成 @ -> src 以及 @repo/* -> packages/* 的映射。
5. ### 视觉化反馈 (DX)：
- 集成了带背景色区分的控制台日志，自动提取子包名称，直观展示当前运行的 Mode 和 Command。

# 后果 (Consequences)

- 优点：
    - 新应用秒级启动：子应用只需几行配置即可拥有完整的工业级构建能力。

    - 规范强制化：所有应用的产物目录（dist/prod）和构建行为保持严格一致。

    - DX 提升：控制台输出更加友好，排查环境变量问题更直观。
