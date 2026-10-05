# manual-dev-server Demo

演示不用 Vite CLI 启动 dev server：自己写一个 TS 入口，调用 Vite 的 Node API 创建并监听 dev server，页面和 API 共用一个端口。

## 运行

```bash
pnpm install
pnpm run dev
```

打开 http://localhost:5173 ，输入名字点「打招呼」，下方显示 `hello, $name`。

## 结构

- `dev.ts` — 启动入口。`createServer({ plugins: [devApiPlugin()] })` 创建 dev server，`server.listen()` 监听端口。dev server 的生命周期由这个文件掌控。
- `vite.config.ts` — 基础配置，只放 `react()` 插件。`createServer` 会自动加载它。
- `src/server/devApiPlugin.ts` — 在 `configureServer` 里把 Express app 插进 `server.middlewares`，`/api/` 交给它，其余放行给 Vite。
- `src/server/api/hello.ts` — API 本体。
- `src/web/` — 页面。

## 和 `vite` 命令的区别

`pnpm run dev` 执行的是 `vite-node dev.ts`，走的是上面手写的启动路径。改成 `vite` 则由 CLI 读 `vite.config.ts` 启动，dev server 归 CLI 管。

## 热更新：只有前端

**前端改动会热更新。** 改 `src/web/` 下的文件，浏览器直接生效，刷新即见新结果，不用重启。

**后端改动不会生效。** 改 `src/server/` 下的文件，运行中的 dev server 不会重新加载，接口仍返回旧结果，必须手动重启 `pnpm run dev`。

原因：这个模式下 `configureServer` 里的 Express app 是启动时一次性构造的，之后一直挂在 `server.middlewares` 上。Vite 的模块图只覆盖前端资源，dev server 自身的 Node 侧代码不在 HMR 管辖范围内，也没有文件监听去重启进程——`vite-node dev.ts` 默认不带 `--watch`，进程不会因文件变化自我重启。
