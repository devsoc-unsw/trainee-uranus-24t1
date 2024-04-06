import express, { Request, Response } from "express";
import { collections } from "../services/database.service";
import User from "../models/user";
import { requireToken } from "../middleware/token.middleware";

export const selfRouter = express.Router();
selfRouter.use(express.json());

selfRouter.get("/", requireToken, async (req: Request, res: Response) => {
  res.status(200).json(req.user);
});

selfRouter.put("/", requireToken, async (req: Request, res: Response) => {
  try {
    const updatedUser: User = req.body as User;
    // Do not update _id
    const { _id, ...withoutId } = updatedUser;
    const result = await collections.users?.updateOne(
      { _id: req.user._id! },
      { $set: withoutId },
    );

    if (result) {
      res.status(200).send("Successfully updated user");
    } else {
      res.status(304).send("Could not update user");
    }
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
});
