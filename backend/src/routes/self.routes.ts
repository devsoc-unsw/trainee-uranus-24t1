import express, { Request, Response } from "express";
import { collections } from "../services/database.service";
import User from "../models/user";
import { requireToken } from "../middleware/token.middleware";
import { assertValidAll } from "../services/user-validation.service";
import { filterAll } from "../services/user-filter";

export const selfRouter = express.Router();
selfRouter.use(express.json());
selfRouter.use(requireToken);

selfRouter.get("/", async (req: Request, res: Response) => {
  res.status(200).json(req.user);
});

selfRouter.put("/", async (req: Request, res: Response) => {
  try {
    const updatedUser: User = filterAll(req.body) as User;
    assertValidAll(updatedUser);

    const { _id, ...withoutId } = updatedUser;  // Do not update _id
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
