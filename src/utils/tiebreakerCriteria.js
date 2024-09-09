const Matches = require("../app/models/Matches");
const { standingsReturn } = require("../utils/standingsTable.js");
const { Op } = require("sequelize");

async function tiebreakerCriteria(teams, tournament_id) {
  const standings = await Promise.all(
    teams.map(async (team) => {
      const resultsConfront = [];
      for (const opponent of teams) {
        if (team.club_id !== opponent.club_id) {
          const result = await confrontResult(
            team.club_id,
            opponent.club_id,
            tournament_id
          );
          resultsConfront.push({ opponentId: opponent.club_id, result });
        }
      }
      return {
        ...team,
        resultsConfront,
      };
    })
  );

  standings.sort(async (a, b) => {
    if (a.points !== b.points) return b.points - a.points;
    if (a.wins !== b.wins) return b.wins - a.wins;
    if (a.points_pro !== b.points_pro) return b.points_pro - a.points_pro;

    for (const resultA of a.resultsConfront) {
      const resultB = b.resultsConfront.find(
        (r) => r.opponentId === resultA.opponentId
      );
      if (resultB === undefined) {
        return resultA.result === "win" ? -1 : 1;
      }
      if (resultA.result !== resultB.result) {
        return resultA.result === "win" ? -1 : 1;
      }
    }

    return 0;
  });

  return standingsReturn(standings);
}

async function confrontResult(teamA, teamB, tournament_id) {
  const matches = await Matches.findAll({
    where: {
      [Op.or]: [
        { home_team_id: teamA, away_team_id: teamB },
        { home_team_id: teamB, away_team_id: teamA },
      ],
      tournament_id,
    },
  });

  if (!matches || matches.length === 0) return null;

  let homePoints = 0;
  let awayPoints = 0;

  matches.forEach((match) => {
    if (match.home_team_id === teamA) {
      homePoints += match.home_team_score;
      awayPoints += match.away_team_score;
    } else {
      homePoints += match.away_team_score;
      awayPoints += match.home_team_score;
    }
  });

  if (homePoints > awayPoints) return "win";
  if (homePoints < awayPoints) return "lose";

  return "draw";
}

module.exports = tiebreakerCriteria;
