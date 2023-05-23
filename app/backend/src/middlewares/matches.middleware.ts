import { Request, Response, NextFunction } from 'express';
// import Teams from '../database/models/Teams';
import TeamsService from '../service/Teams.service';

export default class compareTeams {
  public static async validate(req: Request, res: Response, next: NextFunction):
  Promise<void | Response> {
    const { homeTeamId, awayTeamId } = req.body;
    if (homeTeamId === awayTeamId) {
      return res.status(422).json({
        message: 'It is not possible to create a match with two equal teams',
      });
    }
    // const teamOne = await Teams.findOne({ where: homeTeamId });
    // const teamTwo = await Teams.findOne({ where: awayTeamId });

    const teamOne = await TeamsService.getById(homeTeamId);
    const teamTwo = await TeamsService.getById(awayTeamId);
    if (!teamOne || !teamTwo) {
      return res.status(404).json({
        message: 'There is no team with such id!',
      });
    }
    next();
  }
}
