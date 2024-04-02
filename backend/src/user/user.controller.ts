import { Request, Response } from "express";
import userService from "./user.service";


const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user = await userService.register(name, email, password);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(error.status || 500).send(error.message || 'Internal Server Error');
  }
}

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await userService.login(email, password);
    res.status(200).json({ token });
  } catch (error: any) {
    res.status(error.status || 500).send(error.message || 'Internal Server Error');
  }
}

export default {register, login };
