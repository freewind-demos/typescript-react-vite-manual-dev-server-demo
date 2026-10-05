import express from "express";
import type { Request, Response } from "express";
import type { Plugin } from "vite";
import { createApiRouter } from "./api/hello.ts";

export const devApiPlugin = (): Plugin => ({
  name: "demo-dev-api",
  configureServer(server) {
    const app = express();
    app.use(createApiRouter());
    server.middlewares.use((request, response, next) => {
      if (!request.url?.startsWith("/api/")) {
        next();
        return;
      }
      app(request as Request, response as Response, next);
    });
  },
});
