import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export default class TokenValidate {
  public static validate(
    req: Request,
    res: Response,
    next: NextFunction,
  ):
    Response | void {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    try {
      const validateToken = jwt.verify(authorization, process.env.JWT_SECRET as string);
      req.body.user = validateToken;
      // if (!validateToken) return res.status(401).json({ message: 'Token must be a valid token' });
      return next();
    } catch (error: any) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}
