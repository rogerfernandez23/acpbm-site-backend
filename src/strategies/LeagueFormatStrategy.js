const TournamentStrategyFormat = require("../rules/TournamentStrategyFormat");

class LeagueFormatStrategy extends TournamentStrategyFormat {
  generate(teams) {
    const matches = [];
    const teamsNumber = teams.length;

    const isOdd = teamsNumber % 2 !== 0;
    if (isOdd) {
      teams.push({ id: null, name: "off" });
    }

    for (let round = 0; round < teamsNumber - 1 + (isOdd ? 1 : 0); round++) {
      for (let i = 0; i < teamsNumber / 2; i++) {
        const home = teams[i];
        const away = teams[teamsNumber - 1 - i];

        if (home.id && away.id) {
          const shift = {
            home_team_id: home.id,
            away_team_id: away.id,
            round: round + 1,
          };

          const reShift = {
            home_team_id: away.id,
            away_team_id: home.id,
            round: round + 1,
          };

          matches.push(shift);
          matches.push(reShift);
        }
      }

      teams.splice(1, 0, teams.pop());
    }

    return matches;
  }
}

module.exports = LeagueFormatStrategy();
