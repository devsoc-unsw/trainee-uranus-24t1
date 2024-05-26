import express, { Request, Response } from "express";
import { collections } from "../services/database.service";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../env";
import { requireToken } from "../middleware/token.middleware";
import { assertValid } from "../services/user-validation.service";
import BadRequestError from "../errors/bad-request-error";
import bcrypt from "bcrypt";
import "express-async-errors"; // Apply async error patch

export const authenticationRouter = express.Router();
authenticationRouter.use(express.json());

authenticationRouter.post("/register", async (req: Request, res: Response) => {
  let { firstName, lastName, email, password } = req.body;
  assertValid.firstName(firstName);
  assertValid.lastName(lastName);
  assertValid.email(email);
  assertValid.password(password);

  if (await collections.users?.findOne({ email })) {
    throw new BadRequestError({ message: "Email already in use" });
  }

  password = await bcrypt.hash(password, 5);
  const result = await collections.users?.insertOne({ firstName, lastName, email, password });

  if (!result) {
    throw new BadRequestError({ message: "Failed to create a new user" });
  }

  res.status(201).send(`Successfullly created a new user with id ${result.insertedId}`);
});

authenticationRouter.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user: User = (await collections.users?.findOne({
    email,
  })) as unknown as User;

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new BadRequestError({ message: "Invalid email or password" });
  }

  const token = jwt.sign(
    { _id: user._id?.toString(), email: user.email },
    SECRET_KEY,
    { expiresIn: "24 hours" },
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
