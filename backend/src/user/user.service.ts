import jwt from 'jsonwebtoken';
import userModel from './user.model';
import { SECRET_KEY } from '../env';

const register = async (name: string, email: string, password: string) => {
  const emailAlreadyExists = userModel.findOne(email);
  if (emailAlreadyExists) {
    throw { status: 400, message: 'Email already in use' };
  }

  const user = userModel.save({ name, email, password });
  return user;
}

const login = async (email: string, password: string) => {
  const foundUser = userModel.findOne(email);
  if (!foundUser) {
    throw { status: 404, message: 'User not found' };
  }

  const passwordMatches = foundUser.password === password;
  if (!passwordMatches) {
    throw { status: 400, message: 'Incorrect password' };
  }

  const token = jwt.sign(
    { _id: foundUser._id, email: foundUser.email },
    SECRET_KEY,
    { expiresIn: '2 hours' }
  );

  return token;
}

export default { register, login };