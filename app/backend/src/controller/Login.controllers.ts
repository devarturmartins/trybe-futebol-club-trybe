import { Request, Response } from 'express';
import loginService from '../service/Login.service';

export default class LoginController {
  public static async login(req: Request, res: Response): Promise<void> {
    try {
      const token = await loginService.login(req.body);
      res.status(200).json({ token });
    } catch (error: any | unknown) {
      res.status(400).json({ message: error.message });
    }
  }
}
