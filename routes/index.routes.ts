import { Router, Request, Response } from 'express';
import todosRoutes from "./todos.routes";
import isAuthenticated from '../middlewares/route-guard.middleware';

const indexRoutes = Router();

indexRoutes.get("/", (req: Request, res: Response) => {
    res.json("All good in here");
  });

  indexRoutes.use("/todos", isAuthenticated, todosRoutes);

export default indexRoutes