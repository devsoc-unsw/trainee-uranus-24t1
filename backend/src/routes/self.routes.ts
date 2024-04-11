import express, { Request, Response } from "express";
import { collections } from "../services/database.service";
import User from "../models/user";
import { requireToken } from "../middleware/token.middleware";
import { assertValidAll } from "../services/user-validation.service";
import { filterAll } from "../services/user-filter";
import "express-async-errors"  // Apply async error patch

export const selfRouter = express.Router();
selfRouter.use(express.json());
selfRouter.use(requireToken);

selfRouter.get("/", async (req: Request, res: Response) => {
  res.status(200).json(req.user);
});

selfRouter.put("/", async (req: Request, res: Response) => {
  const updatedUser: User = filterAll(req.body) as User;
  assertValidAll(updatedUser);

  const { _id, ...withoutId } = updatedUser;  // Do not update _id
  const result = await collections.users?.updateOne(
    { _id: req.user._id! },
    { $set: withoutId },
  );
  if (!result) {
    return res.status(304).send("Could not update user");
  }

  res.status(200).send("Successfully updated user");
});
