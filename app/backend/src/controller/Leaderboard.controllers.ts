import { Request, Response } from 'express';
import Leaderboard from '../service/Leaderboard.service';

export default class LeaderboardController {
  public static async home(req: Request, res: Response) {
    try {
      const result = await Leaderboard.home();
      res.status(200).json(result[0]);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public static async filter(req: Request, res: Response) {
    try {
      const result = await Leaderboard.filter();
      res.status(200).json(result[0]);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public static async away(req: Request, res: Response) {
    try {
      const result = await Leaderboard.away();
      res.status(200).json(result[0]);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
