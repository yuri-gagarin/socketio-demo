import type { Request, Response, Router } from "express";

export const testRoutes = (router: Router) => {
    router.get("/api/test_index", (req: Request, res: Response) => {
      return res.status(200).json({ responseMsg: "Test route ok" });
    });
}