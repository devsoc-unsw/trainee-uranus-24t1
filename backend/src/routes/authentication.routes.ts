// External Dependencies
import express, { Request, Response } from 'express';
import { collections } from '../services/database.service';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../env';
import { tokenVerifier } from '../middleware/token.middleware';
import { ObjectId } from 'mongodb';
import staticValidation from '../services/static-validation.service';

// Global Config
export const authenticationRouter = express.Router();
authenticationRouter.use(express.json());

authenticationRouter.post('/register', async (req: Request, res: Response) => {
  try {
    const newUser = req.body as User;

    const existingUser = await collections.users?.findOne({ email: newUser.email }) as unknown as User;

    if (existingUser) {
      return res.status(400).send('Email already in use');
    }

    const result = await collections.users?.insertOne(newUser);

    if (result) {
      res.status(201).send(`Successfully created a new user with id ${result.insertedId}`);
    } else {
      res.status(400).send('Failed to create a new user');
    }
  } catch (error: any) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

authenticationRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user: User = await collections.users?.findOne({ email }) as unknown as User;

    if (!user) {
      return res.status(400).send('Invalid email or password');
    }
    if (user.password !== password) {
      return res.status(400).send('Invalid email or password');
    }

    const token = jwt.sign(
      { _id: user._id?.toString(), email: user.email },
      SECRET_KEY,
      { expiresIn: '2 hours' }
    );

    res.status(200).json({ token });
  } catch (error: any) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

authenticationRouter.get('/hi', tokenVerifier, async (req: Request, res: Response) => {
  try {
    res.status(200).send(`Hello, ${req.user.firstName}`);
  } catch (error: any) {
    console.error(error);
    res.status(400).send(error.message);
  }
});
