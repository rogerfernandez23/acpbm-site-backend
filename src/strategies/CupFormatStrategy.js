const TournamentFormatStrategy = require("../rules/TournamentStrategyFormat");

class CupFormatStrategy extends TournamentFormatStrategy {
  generate(teams) {
    const matches = [];
    const groups = {};

    teams.forEach((team) => {
      if (!groups[team.group_name]) {
        groups[team.group_name] = [];
      }
      groups[team.group_name].push(team);
    });

    for (const groupName in groups) {
      const groupTeams = groups[groupName];
      const teamsNumber = groupTeams.length;

      const totalRounds = (teamsNumber - 1) * 2;
      let round = 1;

      while (round <= totalRounds) {
        for (let i = 0; i < teamsNumber; i++) {
          for (let j = i + 1; j < teamsNumber; j++) {
            const home = groupTeams[i];
            const away = groupTeams[j];

            if (round <= totalRounds / 2) {
              matches.push({
                home_team_id: home.id,
                away_team_id: away.id,
                round_number: round,
                // group_name: groupName,
              });
            }

            if (round <= totalRounds / 2) {
              matches.push({
                home_team_id: away.id,
                away_team_id: home.id,
                round_number: round + totalRounds / 2,
                // group_name: groupName,
              });
            }
          }
        }
        round++;
      }
    }

    return matches;
  }
}

module.exports = CupFormatStrategy;
