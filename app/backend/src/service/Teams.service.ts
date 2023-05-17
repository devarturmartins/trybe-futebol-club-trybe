import Teams from '../database/models/Teams';

export default class TeamsService {
  public static async getAll(): Promise<Teams[]> {
    const teams = await Teams.findAll();

    return teams;
  }

  public static async getById(id: number): Promise<Teams | null> {
    const team = await Teams.findByPk(id);

    return team;
  }
}
