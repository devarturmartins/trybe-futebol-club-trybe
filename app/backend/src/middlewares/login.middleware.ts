import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcryptjs';
import Users from '../database/models/Users';

const regex = /^[a-z0-9.]+@[a-z0-9]+.[a-z]+.[a-z]?$/i;

export default class loginValidate {
  public static async validate(req: Request, res: Response, next: NextFunction)
    :Promise<Response | void> {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const compare: boolean = bcrypt.compareSync(password, user.dataValues.password);
    if (password.length < 6 || !compare || !email.match(regex)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  }
}
