import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { SECRET_KEY } from "../env";
import { collections } from "../services/database.service";
import { ObjectId } from "mongodb";
import User from "../models/user";

export async function requireToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).send("Please provide token");
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const _id: string = (decoded as JwtPayload)._id;
    const user = (await collections.users?.findOne({
      _id: new ObjectId(_id),
    })) as unknown as User;
    if (!user) {
      res.status(403).send("Bad token");
    }
    req.user = user;

    next();
  } catch (error) {
    res.status(403).send("Bad token");
  }
}
