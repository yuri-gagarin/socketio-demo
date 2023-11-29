import { Router } from "express"
import { indexRoutes } from "./indexRoutes.js";
import { testRoutes } from "./testRoutes.js"

export const combineRoutes = (router: Router): Router => {
    indexRoutes(router);
    testRoutes(router);
    return router;
};
