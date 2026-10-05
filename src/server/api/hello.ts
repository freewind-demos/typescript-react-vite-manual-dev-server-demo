import { Router } from "express";

export const createApiRouter = (): Router => {
  const router = Router();

  router.get("/api/hello", (request, response) => {
    const name = String(request.query.name ?? "").trim();
    if (!name) {
      response.status(400).json({ ok: false, error: "缺少 name 查询参数" });
      return;
    }
    response.json({ ok: true, message: `hello, ${name}` });
  });

  return router;
};
