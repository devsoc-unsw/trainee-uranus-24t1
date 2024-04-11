// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import User from "../models/user";

// Global Config
export const superRouter = express.Router();
superRouter.use(express.json());

// GET
superRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const users = (await collections.users
      ?.find({})
      .toArray()) as unknown as User[];

    res.status(200).send(users);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.status(500).send(error.message);
    }
  }
});

superRouter.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const query = { _id: new ObjectId(id) };
    const user = (await collections.users?.findOne(query)) as unknown as User;

    if (user) {
      res.status(200).send(user);
    }
  } catch (error) {
    res
      .status(404)
      .send(`Unable to find matching document with id: ${req.params.id}`);
  }
});

// POST
superRouter.post("/", async (req: Request, res: Response) => {
  try {
    const newUser = req.body as User;
    const result = await collections.users?.insertOne(newUser);

    if (result) {
      res
        .status(201)
        .send(`Successfully created a new user with id ${result.insertedId}`);
    } else {
      res.status(500).send("Failed to create a new user");
    }
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
});

// PUT
superRouter.put("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const updatedUser: User = req.body as User;
    const query = { _id: new ObjectId(id) };
    const result = await collections.users?.updateOne(query, {
      $set: updatedUser,
    });

    if (result) {
      res.status(200).send(`Successfully updated game with id ${id}`);
    } else {
      res.status(304).send(`Game with id: ${id} not updated`);
    }
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
});

// DELETE
superRouter.delete("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const query = { _id: new ObjectId(id) };
    const result = await collections.users?.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(202).send(`Successfully removed game with id ${id}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove game with id ${id}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`Game with id ${id} does not exist`);
    }
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
});
