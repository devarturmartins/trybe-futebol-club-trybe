import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';

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
}
