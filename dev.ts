import { createServer } from "vite";
import { devApiPlugin } from "./src/server/devApiPlugin.ts";

// 这里不使用 Vite CLI：dev server 由本文件创建、启动、关闭。
// 基础配置（react 插件、端口）来自 vite.config.ts，createServer 会自动加载并合并。
const server = await createServer({ plugins: [devApiPlugin()] });

await server.listen();

server.printUrls();
