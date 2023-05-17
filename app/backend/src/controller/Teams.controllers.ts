import { Request, Response } from 'express';
import TeamsService from '../service/Teams.service';

export default class TeamsController {
  public static async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const teams = await TeamsService.getAll();
      res.status(200).json(teams);
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public static async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const team = await TeamsService.getById(Number(id));
      res.status(200).json(team);
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
