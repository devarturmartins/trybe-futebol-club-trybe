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

  public static async finishMatch(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await MatchesService.finishMatch(id);
      res.status(200).json({ message: 'Finished' });
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public static async attMatch(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals } = req.body;
      const match = await MatchesService.attMatch(id, homeTeamGoals, awayTeamGoals);
      res.status(200).json(match);
    } catch (err) {
      res.status(500).json({ message: 'Artur' });
    }
  }

  public static async createMatch(req: Request, res: Response): Promise<void> {
    try {
      const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
      const match = await MatchesService.createMatch(
        homeTeamId,
        awayTeamId,
        homeTeamGoals,
        awayTeamGoals,
      );
      res.status(201).json(match);
    } catch (err) {
      res.status(404).json({ message: 'There is no team with such id!' });
    }
  }
}
