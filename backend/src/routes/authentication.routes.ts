// External Dependencies
import express, { Request, Response } from "express";
import { collections } from "../services/database.service";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../env";
import { requireToken } from "../middleware/token.middleware";
import { filterAll } from "../services/user-filter";
import { assertValidAll } from "../services/user-validation.service";
import BadRequestError from "../errors/bad-request-error";
import "express-async-errors"  // Apply async error patch

// Global Config
export const authenticationRouter = express.Router();
authenticationRouter.use(express.json());

authenticationRouter.post("/register", async (req: Request, res: Response) => {
  const newUser = filterAll(req.body) as User;
  assertValidAll(newUser);
  
  const existingUser = (await collections.users?.findOne({
    email: newUser.email,
  })) as unknown as User;
  if (existingUser) {
    throw new BadRequestError({ message: "Email already in use" });
  }

  const result = await collections.users?.insertOne(newUser);
  if (!result) {
    throw new BadRequestError({ message: "Failed to create a new user" });
  }

  res
    .status(201)
    .send(`Successfully created a new user with id ${result.insertedId}`);
});

authenticationRouter.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user: User = (await collections.users?.findOne({
    email,
  })) as unknown as User;

  if (!user || user.password !== password) {
    throw new BadRequestError({ message: "Invalid email or password" });
  }

  const token = jwt.sign(
    { _id: user._id?.toString(), email: user.email },
    SECRET_KEY,
    { expiresIn: "2 hours" },
  );

  res.status(200).json({ token });
});

authenticationRouter.get(
  "/hi",
  requireToken,
  async (req: Request, res: Response) => {
    res.status(200).send(`Hello, ${req.user.firstName}`);
  },
);
