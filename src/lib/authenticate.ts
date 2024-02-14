import {Request} from 'express';
import {MyContext} from '../types/MyContext';
import jwt from 'jsonwebtoken';
import {LoginUser, TokenContent} from '../types/DBTypes';

export default async (req: Request): Promise<MyContext> => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    try {
      const token = authHeader.split(' ')[1];
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET not defined');
      }

      const userFromToken = jwt.verify(
        token,
        process.env.JWT_SECRET,
      ) as LoginUser;

      if (!userFromToken) {
        return {};
      }

      const tokenContent: TokenContent = {
        user: userFromToken,
        token,
      };

      return {userdata: tokenContent};
    } catch (error) {
      return {};
    }
  }
  return {};
};
