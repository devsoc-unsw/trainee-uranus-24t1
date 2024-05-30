import express, { Request, Response } from "express";
import { requireToken } from "../middleware/token.middleware";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import { filterPublic } from "../services/user-filter";
import "express-async-errors"; // Apply async error patch
import Message, { MessageType } from "../models/message";
import BadRequestError from "../errors/bad-request-error";

export const usersRouter = express.Router();
usersRouter.use(express.json());
usersRouter.use(requireToken);

usersRouter.post("/from-id", async (req: Request, res: Response) => {
  const ids: string[] = req.body.ids;
  const objectIds = ids.map((id) => new ObjectId(id));

  const query = { _id: { $in: objectIds } };
  const users = await collections.users?.find(query).toArray();
  return res.status(200).json(users?.map(filterPublic));
});

usersRouter.post(
  "/:id/start-conversation",
  async (req: Request, res: Response) => {
    const id = new ObjectId(req.params.id);

    const findResult = await collections.messages?.findOne({
      members: { $all: [id, req.user._id!] },
    });
    if (findResult) {
      return res.status(200).json("Conversation already exists");
    }

    const message = new Message(
      [id, req.user._id!],
      req.user._id!,
      MessageType.Default,
      "Hi!",
    );
    const insertResult = await collections.messages?.insertOne(message);
    if (!insertResult) {
      throw new BadRequestError({ message: "Could not start conversation" });
    }

    return res.status(200).json(`Conversation started with ${id}`);
  },
);
