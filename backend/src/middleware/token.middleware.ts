import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { SECRET_KEY } from "../env";

export function tokenVerifier(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).send('Please provide token');
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req._id = (decoded as JwtPayload)._id;

    next();
  } catch (error) {
    res.status(403).send('Bad token');
  }
}
