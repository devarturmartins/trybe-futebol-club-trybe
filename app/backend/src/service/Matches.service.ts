import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';

interface Match {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export default class MatchesService {
  public static async getAll(progress: string): Promise<Matches[]> {
    if (progress) {
      const bool = progress === 'true' || 'false';
      const matches = await Matches.findAll({
        where: { inProgress: bool },
        include: [
          { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
          { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
        ] });
      return matches;
    }
    const matches = await Matches.findAll({ include: [
      { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
      { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
    ] });

    return matches;
  }

  public static async finishMatch(id: string): Promise<Matches | unknown> {
    const match = await Matches.findByPk(id);
    if (!match) throw new Error('Match not found');
    if (match.inProgress === false) throw new Error('Match already finished');
    match.inProgress = false;
    await match.save();
    return match;
  }

  public static async attMatch(
    id: string,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<Matches | unknown> {
    const match = await Matches.findByPk(id);
    if (!match) throw new Error('Match not found');
    if (match.inProgress === false) throw new Error('Match already started');
    match.homeTeamGoals = homeTeamGoals;
    match.awayTeamGoals = awayTeamGoals;
    await match.update(
      {
        homeTeamGoals,
        awayTeamGoals,
      },
      { where: { id } },
    );
    return match;
  }

  public static async createMatch(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<Match | Matches> {
    const match = await Matches.create({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
    return match;
  }
}
