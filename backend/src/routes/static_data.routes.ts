import express, { Request, Response } from "express";
import { requireToken } from "../middleware/token.middleware";
import { getStaticData } from "../services/database.service";

export const staticDataRouter = express.Router();
staticDataRouter.use(express.json());
staticDataRouter.use(requireToken);

staticDataRouter.get("/", async (req: Request, res: Response) => {
  return res.status(200).json(await getStaticData());
});
