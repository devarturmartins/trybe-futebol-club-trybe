import sequelize from '../database/models';

const QUERY_HOME = `SELECT 
t.team_name as name,
SUM(
    CASE
        WHEN m.home_team_goals > m.away_team_goals THEN 3
        ELSE 0
        END
) + SUM(
    CASE
        WHEN m.home_team_goals = m.away_team_goals THEN 1
        ELSE 0
        END
) as totalPoints,
SUM(m.home_team_id = t.id) as totalGames,
SUM(
    CASE
        WHEN m.home_team_goals > m.away_team_goals THEN 1
        ELSE 0
        END
) as totalVictories,
    SUM(
    CASE
        WHEN m.home_team_goals = m.away_team_goals THEN 1
        ELSE 0
        END
) as totalDraws,
    SUM(
    CASE
        WHEN m.home_team_goals < m.away_team_goals THEN 1
        ELSE 0
        END
) as totalLosses,
SUM(m.home_team_goals) as goalsFavor,
SUM(m.away_team_goals) as goalsOwn
FROM TRYBE_FUTEBOL_CLUBE.teams as t
INNER JOIN TRYBE_FUTEBOL_CLUBE.matches as m
on t.id = m.home_team_id
where m.in_progress = 0
group by t.team_name
order by totalPoints DESC`;

export default class Leaderboard {
  public static async home() {
    return sequelize.query(QUERY_HOME);
  }
}
