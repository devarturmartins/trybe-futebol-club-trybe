import { Request, Response } from 'express';
import MatchesService from '../service/Matches.service';

export default class MatchesController {
  public static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const { inProgress } = req.query;
      const matches = await MatchesService.getAll(inProgress as string);
      res.status(200).json(matches);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
