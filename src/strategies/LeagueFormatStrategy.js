const TournamentStrategyFormat = require("../rules/TournamentStrategyFormat");

class LeagueFormatStrategy extends TournamentStrategyFormat {
  generate(teams) {
    const matches = [];
    const teamsNumber = teams.length;

    const isOdd = teamsNumber % 2 !== 0;
    if (isOdd) {
      teams.push({ id: 0, name: "off" });
    }

    const totalRounds = teams.length - 1;
    const halfSize = teams.length / 2;

    for (let round = 0; round < totalRounds; round++) {
      for (let i = 0; i < halfSize; i++) {
        const home = teams[i];
        const away = teams[teams.length - 1 - i];

        if (home.id && away.id && home.id !== away.id) {
          matches.push({
            home_team_id: home.id,
            away_team_id: away.id,
            round_number: round + 1,
          });

          matches.push({
            home_team_id: away.id,
            away_team_id: home.id,
            round_number: round + teams.length,
          });
        }
      }

      teams.splice(1, 0, teams.pop());
    }

    return matches;
  }
}

module.exports = LeagueFormatStrategy;
