import express, { Request, Response } from "express";
import { requireToken } from "../middleware/token.middleware";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import User from "../models/user";
import { filterPublic } from "../services/user-filter";
import BadRequestError from "../errors/bad-request-error";
import "express-async-errors"; // Apply async error patch

export const usersRouter = express.Router();
usersRouter.use(express.json());
usersRouter.use(requireToken);

usersRouter.get("/profile/:id", async (req: Request, res: Response) => {
  const id: string = req.params.id;

  const query = { _id: new ObjectId(id) };
  const result = (await collections.users?.findOne(query)) as unknown as User;
  if (!result) {
    throw new BadRequestError({ message: "Could not find user" });
  }

  res.status(200).send(filterPublic(result));
});
