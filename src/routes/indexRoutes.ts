import type { Request, Response, Router } from "express";

export const indexRoutes = (router: Router) => {
    router.get("/", (req: Request, res: Response) => {
      return res.status(200).json({ responseMsg: "Home route ok" });
    });
}