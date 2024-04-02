import express, { Request, Response } from 'express';
import userController from './user.controller';
import userMiddleware from './user.middleware';

const userRouter = express.Router();

// userRouter.use()
userRouter.post('/register', userMiddleware.validateRegister, userController.register);
userRouter.post('/login', userMiddleware.validateLogin, userController.login);

export default userRouter;
