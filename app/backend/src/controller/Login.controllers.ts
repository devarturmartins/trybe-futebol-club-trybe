import { Request, Response } from 'express';
import loginService from '../service/Login.service';

export default class LoginController {
  public static async login(req: Request, res: Response): Promise<Response> {
    try {
      const token = await loginService.login(req.body);
      return res.status(200).json({ token });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: 'Invalid email or password' });
    }
  }

  public static async role(req: Request, res: Response): Promise<Response> {
    try {
      const { email } = req.body.data;
      const role = await loginService.role(email);
      return res.status(200).json({ role });
    } catch (error: any) {
      return res.status(500).json({ message: 'Invalid email or password' });
    }
  }
}
